export interface Participant {
  _id: string;
  _createdAt: string;
  name: string;
  score: number;
  createdAt?: string;
  _updatedAt?: string;
  _isOptimistic?: boolean;
}

export type SortOption = "latest" | "highest" | "lowest" | "alphabetical";

// Network quality types
export type NetworkQuality = 'excellent' | 'good' | 'poor' | 'offline';

// Connection configuration based on network quality
export interface ConnectionConfig {
  heartbeatInterval: number;     // How often to check connection
  warningThreshold: number;      // Time before showing warning
  disconnectThreshold: number;   // Time before considering disconnected
  reconnectInterval: number;     // How often to attempt reconnection
  batchUpdates: boolean;         // Whether to batch updates
  batchInterval: number;         // How often to process batched updates
}

// Performance metrics tracking
export interface PerformanceMetrics {
  latency: number[];             // Array of recent latency measurements
  successRate: number;           // Success rate of recent connections (0-1)
  lastSuccessTime: number;       // Timestamp of last successful update
  reconnectAttempts: number;     // Number of reconnection attempts
  updateFrequency: number;       // Average updates per minute
}

// Connection status
export interface ConnectionStatus {
  isConnected: boolean;
  quality: NetworkQuality;
  lastUpdate: number;
  config: ConnectionConfig;
} 