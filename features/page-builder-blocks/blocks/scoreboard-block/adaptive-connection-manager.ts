"use client";

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Network condition classes
type NetworkQuality = 'excellent' | 'good' | 'poor' | 'offline';

// Connection configuration based on network quality
interface ConnectionConfig {
  heartbeatInterval: number;     // How often to check connection
  warningThreshold: number;      // Time before showing warning
  disconnectThreshold: number;   // Time before considering disconnected
  reconnectInterval: number;     // How often to attempt reconnection
  batchUpdates: boolean;         // Whether to batch updates
  batchInterval: number;         // How often to process batched updates
}

const CONNECTION_CONFIG: Record<NetworkQuality, ConnectionConfig> = {
  excellent: {
    heartbeatInterval: 10000,    // 10s
    warningThreshold: 3000,      // 3s
    disconnectThreshold: 6000,   // 6s
    reconnectInterval: 2000,     // 2s
    batchUpdates: false,
    batchInterval: 0
  },
  good: {
    heartbeatInterval: 15000,    // 15s
    warningThreshold: 5000,      // 5s
    disconnectThreshold: 10000,  // 10s
    reconnectInterval: 3000,     // 3s
    batchUpdates: true,
    batchInterval: 500           // 500ms
  },
  poor: {
    heartbeatInterval: 30000,    // 30s
    warningThreshold: 10000,     // 10s
    disconnectThreshold: 20000,  // 20s
    reconnectInterval: 5000,     // 5s
    batchUpdates: true,
    batchInterval: 1000          // 1s
  },
  offline: {
    heartbeatInterval: 60000,    // 60s
    warningThreshold: 15000,     // 15s
    disconnectThreshold: 30000,  // 30s
    reconnectInterval: 10000,    // 10s
    batchUpdates: true,
    batchInterval: 2000          // 2s
  }
};

// Performance metrics tracking
interface PerformanceMetrics {
  latency: number[];             // Array of recent latency measurements
  successRate: number;           // Success rate of recent connections (0-1)
  lastSuccessTime: number;       // Timestamp of last successful update
  reconnectAttempts: number;     // Number of reconnection attempts
  updateFrequency: number;       // Average updates per minute
}

export class AdaptiveConnectionManager {
  private client: any;
  private currentQuery: string | null = null;
  private subscription: any = null;
  private listeners: Set<(data: any) => void> = new Set();
  private isConnected: boolean = false;
  private networkQuality: NetworkQuality = 'good';
  private metrics: PerformanceMetrics = {
    latency: [],
    successRate: 1,
    lastSuccessTime: Date.now(),
    reconnectAttempts: 0,
    updateFrequency: 0
  };
  private updateQueue: any[] = [];
  private updateTimerId: NodeJS.Timeout | null = null;
  private reconnectTimerId: NodeJS.Timeout | null = null;
  private heartbeatTimerId: NodeJS.Timeout | null = null;
  private lastHeartbeatTime: number = Date.now();
  private pingInProgress: boolean = false;
  private updatesSinceLastCheck: number = 0;
  private lastMetricsTime: number = Date.now();
  private pingStartTime: number = 0;
  private abortController: AbortController | null = null;

  constructor() {
    this.client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
    });

    // Initialize with detection of network environment if in browser
    if (typeof window !== 'undefined') {
      this.detectNetworkQuality();
      
      // Set up event listeners for connection changes
      window.addEventListener('online', () => this.handleNetworkChange(true));
      window.addEventListener('offline', () => this.handleNetworkChange(false));
      
      // Set up periodic network quality detection
      setInterval(() => this.detectNetworkQuality(), 60000); // Check every minute
    }
  }

  // Public methods
  public subscribe(query: string, listener: (data: any) => void): () => void {
    this.listeners.add(listener);
    
    // Start listening if this is the first subscriber
    if (this.listeners.size === 1) {
      this.startListening(query);
    } else if (query !== this.currentQuery) {
      // If query changed, restart listening
      this.stopListening();
      this.startListening(query);
    }
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.stopListening();
      }
    };
  }

  public getCurrentMetrics(): PerformanceMetrics {
    // Calculate current performance metrics
    this.calculateUpdateFrequency();
    return { ...this.metrics };
  }

  public getConnectionStatus(): { 
    isConnected: boolean; 
    quality: NetworkQuality;
    lastUpdate: number;
    config: ConnectionConfig;
  } {
    return {
      isConnected: this.isConnected,
      quality: this.networkQuality,
      lastUpdate: this.metrics.lastSuccessTime,
      config: this.getCurrentConfig()
    };
  }

  public manualReconnect(): void {
    this.reconnect(true);
  }

  // Private methods
  private startListening(query: string): void {
    this.currentQuery = query;
    
    try {
      // Set up the real-time subscription
      this.subscription = this.client.listen(query)
        .subscribe({
          next: (update: any) => {
            this.handleUpdate(update);
          },
          error: (err: Error) => {
            console.error('Error in real-time subscription:', err);
            this.isConnected = false;
            this.metrics.successRate *= 0.9; // Reduce success rate on errors
            this.scheduleReconnect();
          }
        });
      
      // Start heartbeat checking
      this.startHeartbeat();
      
      // Initial ping to measure latency
      this.pingServer();
      
    } catch (error) {
      console.error('Failed to start listening:', error);
      this.isConnected = false;
      this.scheduleReconnect();
    }
  }

  private stopListening(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    
    this.clearAllTimers();
    this.isConnected = false;
    this.currentQuery = null;
  }

  private handleUpdate(update: any): void {
    this.lastHeartbeatTime = Date.now();
    this.isConnected = true;
    this.metrics.lastSuccessTime = Date.now();
    this.metrics.reconnectAttempts = 0;
    
    // Increment update counter for frequency calculation
    this.updatesSinceLastCheck++;
    
    // If we're batching updates based on current network quality
    if (this.getCurrentConfig().batchUpdates) {
      this.updateQueue.push(update);
      this.scheduleBatchProcess();
    } else {
      // Otherwise, immediately notify listeners
      this.notifyListeners(update);
    }
  }

  private scheduleBatchProcess(): void {
    if (this.updateTimerId !== null) return; // Already scheduled
    
    const config = this.getCurrentConfig();
    this.updateTimerId = setTimeout(() => {
      this.processBatchedUpdates();
      this.updateTimerId = null;
    }, config.batchInterval);
  }

  private processBatchedUpdates(): void {
    if (this.updateQueue.length === 0) return;
    
    // Process all queued updates
    const updates = [...this.updateQueue];
    this.updateQueue = [];
    
    // Process each update sequentially (can be optimized further by merging or filtering)
    for (const update of updates) {
      this.notifyListeners(update);
    }
  }

  private notifyListeners(update: any): void {
    this.listeners.forEach(listener => {
      try {
        listener(update);
      } catch (error) {
        console.error('Error in listener:', error);
      }
    });
  }

  private startHeartbeat(): void {
    this.clearHeartbeatTimer();
    
    const config = this.getCurrentConfig();
    this.heartbeatTimerId = setInterval(() => {
      this.checkHeartbeat();
    }, config.heartbeatInterval / 3); // Check more frequently than the interval
  }

  private checkHeartbeat(): void {
    const now = Date.now();
    const timeSinceLastHeartbeat = now - this.lastHeartbeatTime;
    const config = this.getCurrentConfig();
    
    if (timeSinceLastHeartbeat > config.disconnectThreshold) {
      // We've passed the disconnect threshold
      if (this.isConnected) {
        this.isConnected = false;
        // Notify listeners that we're disconnected
        this.listeners.forEach(listener => {
          try {
            listener({ type: 'connection-status', status: 'disconnected' });
          } catch (error) {
            console.error('Error in listener:', error);
          }
        });
      }
      
      this.scheduleReconnect();
    } else if (timeSinceLastHeartbeat > config.warningThreshold) {
      // We're approaching the disconnect threshold
      this.listeners.forEach(listener => {
        try {
          listener({ type: 'connection-status', status: 'warning' });
        } catch (error) {
          console.error('Error in listener:', error);
        }
      });
      
      // Ping the server to check if it's actually responsive
      if (!this.pingInProgress) {
        this.pingServer();
      }
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimerId !== null) return; // Already scheduled
    
    const config = this.getCurrentConfig();
    // Use exponential backoff based on number of reconnect attempts
    const delay = Math.min(
      config.reconnectInterval * Math.pow(1.5, this.metrics.reconnectAttempts),
      60000 // Max 1 minute between reconnects
    );
    
    this.reconnectTimerId = setTimeout(() => {
      this.reconnect();
      this.reconnectTimerId = null;
    }, delay);
  }

  private reconnect(manual: boolean = false): void {
    if (!manual) {
      this.metrics.reconnectAttempts++;
    } else {
      // Reset counters for manual reconnects
      this.metrics.reconnectAttempts = 0;
    }
    
    if (this.currentQuery) {
      this.stopListening();
      this.startListening(this.currentQuery);
    }
  }

  private pingServer(): void {
    // Don't ping if offline
    if (!navigator.onLine || this.pingInProgress) return;
    
    this.pingInProgress = true;
    this.pingStartTime = Date.now();
    this.abortController = new AbortController();
    
    // Use a simple fetch to the Sanity API to measure network latency
    fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/ping`, {
      method: 'GET',
      signal: this.abortController.signal,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      const latency = Date.now() - this.pingStartTime;
      this.updateLatencyMetrics(latency);
      this.pingInProgress = false;
      this.abortController = null;
    })
    .catch(error => {
      console.error('Ping failed:', error);
      this.pingInProgress = false;
      this.abortController = null;
      // If not aborted, consider it a failed ping
      if (error.name !== 'AbortError') {
        this.updateLatencyMetrics(-1); // -1 indicates failure
      }
    });
    
    // Set timeout for the ping
    setTimeout(() => {
      if (this.pingInProgress && this.abortController) {
        this.abortController.abort();
        this.pingInProgress = false;
        this.updateLatencyMetrics(-1); // -1 indicates failure
      }
    }, 5000); // 5 second timeout
  }

  private updateLatencyMetrics(latency: number): void {
    if (latency > 0) {
      // Keep only the last 10 measurements
      this.metrics.latency.push(latency);
      if (this.metrics.latency.length > 10) {
        this.metrics.latency.shift();
      }
      
      // Adjust network quality based on latency
      this.adjustNetworkQuality();
    } else {
      // Failed ping
      this.metrics.successRate *= 0.8; // Reduce success rate significantly
      if (this.metrics.successRate < 0.5) {
        // Poor network quality
        this.networkQuality = 'poor';
      }
      if (this.metrics.successRate < 0.2) {
        // Consider offline
        this.networkQuality = 'offline';
      }
    }
  }

  private calculateUpdateFrequency(): void {
    const now = Date.now();
    const elapsedMinutes = (now - this.lastMetricsTime) / 60000;
    
    if (elapsedMinutes >= 1) {
      // Calculate updates per minute
      this.metrics.updateFrequency = this.updatesSinceLastCheck / elapsedMinutes;
      this.updatesSinceLastCheck = 0;
      this.lastMetricsTime = now;
    }
  }

  private detectNetworkQuality(): void {
    // Use Navigator connection API if available
    if (navigator && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        const effectiveType = connection.effectiveType; // 4g, 3g, 2g, slow-2g
        const downlink = connection.downlink; // Mbps
        const rtt = connection.rtt; // ms
        
        if (effectiveType === '4g' && downlink > 5 && rtt < 100) {
          this.networkQuality = 'excellent';
        } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1)) {
          this.networkQuality = 'good';
        } else if (effectiveType === '3g' || effectiveType === '2g') {
          this.networkQuality = 'poor';
        } else {
          this.networkQuality = 'offline';
        }
        return;
      }
    }
    
    // Fallback to checking online status
    if (navigator.onLine) {
      // No detailed info available, default to 'good'
      this.networkQuality = 'good';
    } else {
      this.networkQuality = 'offline';
    }
  }

  private handleNetworkChange(isOnline: boolean): void {
    if (isOnline) {
      // Try to detect quality when coming back online
      this.detectNetworkQuality();
      
      // Reconnect if we have an active subscription
      if (this.currentQuery) {
        this.reconnect(true);
      }
    } else {
      this.networkQuality = 'offline';
      this.isConnected = false;
    }
    
    // Update timers based on new network quality
    this.restartTimers();
  }

  private adjustNetworkQuality(): void {
    // Calculate average latency
    const avgLatency = this.metrics.latency.reduce((sum, val) => sum + val, 0) / 
                        (this.metrics.latency.length || 1);
    
    // Adjust network quality based on latency and success rate
    if (avgLatency < 100 && this.metrics.successRate > 0.9) {
      this.networkQuality = 'excellent';
    } else if (avgLatency < 300 && this.metrics.successRate > 0.7) {
      this.networkQuality = 'good';
    } else if (avgLatency < 1000 && this.metrics.successRate > 0.3) {
      this.networkQuality = 'poor';
    } else {
      this.networkQuality = 'offline';
    }
    
    // Restart timers with new configuration
    this.restartTimers();
  }

  private restartTimers(): void {
    this.clearAllTimers();
    
    // Restart heartbeat with new config
    if (this.currentQuery) {
      this.startHeartbeat();
    }
    
    // Process any batched updates
    this.processBatchedUpdates();
  }

  private clearAllTimers(): void {
    this.clearHeartbeatTimer();
    this.clearReconnectTimer();
    this.clearUpdateTimer();
  }

  private clearHeartbeatTimer(): void {
    if (this.heartbeatTimerId !== null) {
      clearInterval(this.heartbeatTimerId);
      this.heartbeatTimerId = null;
    }
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimerId !== null) {
      clearTimeout(this.reconnectTimerId);
      this.reconnectTimerId = null;
    }
  }

  private clearUpdateTimer(): void {
    if (this.updateTimerId !== null) {
      clearTimeout(this.updateTimerId);
      this.updateTimerId = null;
    }
  }

  private getCurrentConfig(): ConnectionConfig {
    return CONNECTION_CONFIG[this.networkQuality];
  }
}

// Create singleton instance
export const connectionManager = new AdaptiveConnectionManager(); 