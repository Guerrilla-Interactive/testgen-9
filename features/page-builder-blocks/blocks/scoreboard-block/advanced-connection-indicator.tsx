"use client";

import { useState, useEffect } from "react";
import { Info, Wifi, WifiOff, RefreshCw, Activity, Gauge, Check } from "lucide-react";

interface AdvancedConnectionIndicatorProps {
  isConnected: boolean;
  isConnecting: boolean;
  connectionQuality: string;
  lastUpdateTime: Date | null;
  metrics: {
    latency: number;
    successRate: number;
    updateFrequency: number;
  };
  position?: "header" | "stats" | "debug";
  onReconnect?: () => void;
}

/**
 * A sophisticated connection indicator that provides detailed information
 * about the connection status and performance metrics.
 */
export function AdvancedConnectionIndicator({
  isConnected,
  isConnecting,
  connectionQuality,
  lastUpdateTime,
  metrics,
  position = "stats",
  onReconnect
}: AdvancedConnectionIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [animateRefresh, setAnimateRefresh] = useState(false);
  
  // Format latency as ms with proper rounding
  const formattedLatency = Math.round(metrics.latency);
  
  // Format success rate as percentage
  const successRate = Math.round(metrics.successRate * 100);
  
  // Get visual indicators based on connection quality
  const getQualityColor = () => {
    if (!isConnected) return "gray";
    
    switch (connectionQuality) {
      case "excellent": return "green";
      case "good": return "teal";
      case "poor": return "amber";
      case "offline": return "gray";
      default: return "blue";
    }
  };
  
  const getQualityLabel = () => {
    if (!isConnected) return "Disconnected";
    if (isConnecting) return "Connecting...";
    
    switch (connectionQuality) {
      case "excellent": return "Excellent Connection";
      case "good": return "Good Connection";
      case "poor": return "Poor Connection";
      case "offline": return "Offline";
      default: return "Connected";
    }
  };
  
  // Handle reconnect with animation
  const handleReconnect = () => {
    if (onReconnect) {
      setAnimateRefresh(true);
      onReconnect();
      
      // Reset animation after it completes
      setTimeout(() => {
        setAnimateRefresh(false);
      }, 1000);
    }
  };
  
  // Show detailed header tooltip
  if (position === "header") {
    return (
      <div className="relative inline-flex ml-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isConnected 
              ? connectionQuality === "excellent" || connectionQuality === "good" 
                ? "bg-green-100 text-green-800" 
                : "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-700"
          }`}
          aria-label="Show connection details"
        >
          <span className="relative flex h-2 w-2 mr-1.5">
            {isConnected && !isConnecting && (
              <span 
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-${getQualityColor()}-400`}
              ></span>
            )}
            {isConnecting && (
              <span 
                className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"
                style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
              ></span>
            )}
            <span 
              className={`relative inline-flex rounded-full h-2 w-2 bg-${getQualityColor()}-500`}
            ></span>
          </span>
          {isConnecting ? "Connecting..." : "Real-time"}
        </button>
        
        {showDetails && (
          <div className="absolute right-0 top-8 z-10 w-72 rounded-lg bg-white p-4 shadow-lg border border-gray-200 text-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                {isConnected ? (
                  <Wifi className={`h-4 w-4 mr-1.5 text-${getQualityColor()}-500`} />
                ) : (
                  <WifiOff className="h-4 w-4 mr-1.5 text-gray-500" />
                )}
                <span className="font-medium">{getQualityLabel()}</span>
              </div>
              
              <button 
                onClick={handleReconnect}
                className={`rounded-full p-1 hover:bg-gray-100 transition-colors ${animateRefresh ? 'animate-spin' : ''}`}
                aria-label="Reconnect"
              >
                <RefreshCw className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-600">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>Latency</span>
                </div>
                <span className={`font-mono ${
                  formattedLatency < 150 
                    ? "text-green-600" 
                    : formattedLatency < 300 
                      ? "text-amber-600" 
                      : "text-red-600"
                }`}>
                  {formattedLatency}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-600">
                  <Check className="h-3 w-3 mr-1" />
                  <span>Success Rate</span>
                </div>
                <span className={`font-mono ${
                  successRate > 90 
                    ? "text-green-600" 
                    : successRate > 70 
                      ? "text-amber-600" 
                      : "text-red-600"
                }`}>
                  {successRate}%
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-600">
                  <Gauge className="h-3 w-3 mr-1" />
                  <span>Updates per Minute</span>
                </div>
                <span className="font-mono text-blue-600">
                  {Math.round(metrics.updateFrequency * 10) / 10}
                </span>
              </div>
            </div>
            
            {lastUpdateTime && (
              <div className="text-xs text-gray-500 border-t border-gray-100 pt-1.5 mt-2">
                Last update: {lastUpdateTime.toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // Show detailed stats panel
  if (position === "stats") {
    return (
      <div 
        className={`rounded-md p-3 border transition-colors duration-300 ${
          isConnected
            ? connectionQuality === "excellent" || connectionQuality === "good"
              ? "bg-green-50 border-green-100"
              : connectionQuality === "poor"
                ? "bg-amber-50 border-amber-100"
                : "bg-gray-100 border-gray-200"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center">
            {isConnected ? (
              <Wifi className={`h-4 w-4 mr-1.5 text-${getQualityColor()}-500`} />
            ) : (
              <WifiOff className="h-4 w-4 mr-1.5 text-gray-500" />
            )}
            <span className="text-sm font-medium">
              {getQualityLabel()}
            </span>
          </div>
          
          <button 
            onClick={handleReconnect}
            className={`rounded-full p-1 hover:bg-gray-100 transition-colors ${animateRefresh ? 'animate-spin' : ''}`}
            aria-label="Reconnect"
          >
            <RefreshCw className="h-3.5 w-3.5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-2 mt-2">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Latency</span>
              <span className={`font-mono ${
                formattedLatency < 150 
                  ? "text-green-600" 
                  : formattedLatency < 300 
                    ? "text-amber-600" 
                    : "text-red-600"
              }`}>
                {formattedLatency}ms
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${
                  formattedLatency < 150 
                    ? "green" 
                    : formattedLatency < 300 
                      ? "amber" 
                      : "red"
                }-500 rounded-full`}
                style={{ 
                  width: `${Math.min(100, Math.max(0, 100 - formattedLatency / 10))}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Success Rate</span>
              <span className={`font-mono ${
                successRate > 90 
                  ? "text-green-600" 
                  : successRate > 70 
                    ? "text-amber-600" 
                    : "text-red-600"
              }`}>
                {successRate}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${
                  successRate > 90 
                    ? "green" 
                    : successRate > 70 
                      ? "amber" 
                      : "red"
                }-500 rounded-full`}
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 pt-1.5 border-t border-gray-100">
          {lastUpdateTime 
            ? `Last update: ${lastUpdateTime.toLocaleTimeString()}` 
            : isConnected 
                ? "Waiting for updates..." 
                : "No connection to server"
          }
        </div>
      </div>
    );
  }
  
  // Debug mode with all metrics (typically for development)
  return (
    <div className="rounded-md p-4 border border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {isConnected ? (
            <Wifi className={`h-5 w-5 mr-2 text-${getQualityColor()}-500`} />
          ) : (
            <WifiOff className="h-5 w-5 mr-2 text-gray-500" />
          )}
          <span className="text-base font-medium">
            {getQualityLabel()}
          </span>
        </div>
        
        <button 
          onClick={handleReconnect}
          className={`rounded-full p-1.5 hover:bg-gray-100 transition-colors ${animateRefresh ? 'animate-spin' : ''}`}
          aria-label="Reconnect"
        >
          <RefreshCw className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <td className="py-1 text-gray-500">Latency</td>
            <td className="py-1 font-mono text-right">{formattedLatency}ms</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-500">Success Rate</td>
            <td className="py-1 font-mono text-right">{successRate}%</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-500">Updates/min</td>
            <td className="py-1 font-mono text-right">{Math.round(metrics.updateFrequency * 10) / 10}</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-500">Quality</td>
            <td className="py-1 font-mono text-right">{connectionQuality}</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-500">Last Update</td>
            <td className="py-1 font-mono text-right">
              {lastUpdateTime ? lastUpdateTime.toLocaleTimeString() : 'Never'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 