"use client";

import { useState, useEffect, useRef } from "react";

type ConnectionStatus = "connected" | "warning" | "disconnected";

interface ConnectionStatusIndicatorProps {
  isConnected: boolean;
  lastUpdateTime: Date | null;
  position?: "header" | "stats";
}

/**
 * A component that displays the current connection status with proper
 * timing and transitions between connected, warning, and disconnected states.
 */
export function ConnectionStatusIndicator({
  isConnected,
  lastUpdateTime,
  position = "stats",
}: ConnectionStatusIndicatorProps) {
  // State to track the visible connection status with proper timing
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connected");
  
  // Reference to timers for proper cleanup
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const disconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle connection status changes with proper timing
  useEffect(() => {
    // When connection is detected
    if (isConnected) {
      // If we were in a warning/disconnected state, clear any pending timers
      if (connectionStatus !== "connected") {
        if (warningTimerRef.current) {
          clearTimeout(warningTimerRef.current);
          warningTimerRef.current = null;
        }
        if (disconnectTimerRef.current) {
          clearTimeout(disconnectTimerRef.current);
          disconnectTimerRef.current = null;
        }
        // Set status back to connected immediately
        setConnectionStatus("connected");
      }
    } 
    // When connection is lost
    else {
      // Only start the warning timer if we're currently in connected state
      // This prevents repeatedly setting timers when already disconnected
      if (connectionStatus === "connected" && !warningTimerRef.current) {
        // Set a 5-second delay before showing the warning state
        const warningTimer = setTimeout(() => {
          setConnectionStatus("warning");
          
          // Set another timer to change to disconnected after 3 seconds in warning state
          const disconnectTimer = setTimeout(() => {
            setConnectionStatus("disconnected");
          }, 3000);
          
          disconnectTimerRef.current = disconnectTimer;
        }, 5000);
        
        warningTimerRef.current = warningTimer;
      }
    }
    
    // Cleanup on unmount or when the effect runs again
    return () => {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
      if (disconnectTimerRef.current) {
        clearTimeout(disconnectTimerRef.current);
        disconnectTimerRef.current = null;
      }
    };
  }, [isConnected, connectionStatus]);

  // Render header badge
  if (position === "header") {
    if (connectionStatus === "connected") {
      return (
        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Real-time
        </span>
      );
    }
    
    if (connectionStatus === "warning") {
      return (
        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <span className="relative flex h-2 w-2 mr-1.5">
            <span 
              className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"
              style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
            ></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          Reconnecting...
        </span>
      );
    }
    
    return null; // Don't show anything when disconnected in the header
  }
  
  // Render stats panel indicator
  return (
    <div className={`rounded-md p-3 border transition-colors duration-300 ${
      connectionStatus === "connected" ? 'bg-indigo-50 border-indigo-100' : 
      connectionStatus === "warning" ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-100 border-gray-200'
    }`}>
      <p className="text-xs text-gray-500 mb-1">Connection Status</p>
      <div className="flex items-center gap-2">
        <div className={`relative h-2 w-2 rounded-full transition-colors duration-300 ${
          connectionStatus === "connected" ? 'bg-green-500' : 
          connectionStatus === "warning" ? 'bg-yellow-500' : 'bg-gray-400'
        }`}>
          {connectionStatus === "connected" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          )}
          {connectionStatus === "warning" && (
            <span 
              className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"
              style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
            ></span>
          )}
        </div>
        <p className={`text-sm font-semibold transition-colors duration-300 ${
          connectionStatus === "connected" ? 'text-indigo-800' : 
          connectionStatus === "warning" ? 'text-yellow-800' : 'text-gray-600'
        }`}>
          {connectionStatus === "connected" ? 'Real-time connected' : 
           connectionStatus === "warning" ? 'Connection unstable...' : 'Connection offline'}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {lastUpdateTime 
          ? `Last update: ${lastUpdateTime.toLocaleTimeString()}` 
          : connectionStatus === "connected" 
              ? "Waiting for updates..." 
              : connectionStatus === "warning"
                  ? "Attempting to reconnect..."
                  : "No connection to server"
        }
      </p>
    </div>
  );
} 