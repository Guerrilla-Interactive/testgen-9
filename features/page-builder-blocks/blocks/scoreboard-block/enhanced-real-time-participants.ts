"use client";

import { useState, useEffect, useRef } from 'react';
import { type Participant } from './types';
import { connectionManager } from './adaptive-connection-manager';

/**
 * Enhanced hook for managing real-time participant data with sophisticated
 * adaptive connection handling and performance optimization.
 * 
 * @param initialParticipants - The initial participants data from server
 * @param query - Optional GROQ query for listening to specific participants
 * @returns Object containing participants data and connection status information
 */
export function useEnhancedRealTimeParticipants(
  initialParticipants: Participant[],
  query?: string
) {
  // State for participant data
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const participantsRef = useRef<Map<string, Participant>>(new Map());
  
  // State for connection status
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionQuality, setConnectionQuality] = useState<string>('good');
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  
  // Performance metrics
  const [metrics, setMetrics] = useState<any>({
    latency: 0,
    successRate: 1,
    updateFrequency: 0
  });
  
  // Function for applying optimistic updates
  const applyOptimisticUpdate = (
    id: string,
    update: Partial<Participant>
  ): void => {
    const currentMap = participantsRef.current;
    const participant = currentMap.get(id);
    
    if (participant) {
      // Create an updated participant with optimistic changes
      const updatedParticipant = { ...participant, ...update, _isOptimistic: true };
      currentMap.set(id, updatedParticipant);
      
      // Update state with the new map values
      setParticipants(Array.from(currentMap.values()));
    }
  };
  
  // Function for removing a participant optimistically
  const applyOptimisticDelete = (id: string): void => {
    const currentMap = participantsRef.current;
    if (currentMap.has(id)) {
      currentMap.delete(id);
      setParticipants(Array.from(currentMap.values()));
    }
  };
  
  // Initialize real-time updates using the adaptive connection manager
  useEffect(() => {
    // Only set up in the browser
    if (typeof window === 'undefined') return;
    
    // Initialize participants map from initial data
    participantsRef.current.clear();
    initialParticipants.forEach(participant => {
      participantsRef.current.set(participant._id, participant);
    });
    
    // Start with the initial participants
    setParticipants(initialParticipants);
    
    // The query to use for real-time updates
    const participantQuery = query || '*[_type == "participant"]';
    
    // Subscribe to real-time updates
    const unsubscribe = connectionManager.subscribe(participantQuery, (update) => {
      // Check if it's a connection status update
      if (update.type === 'connection-status') {
        if (update.status === 'warning') {
          // Connection is unstable
          setIsConnecting(true);
        } else if (update.status === 'disconnected') {
          // Connection is lost
          setIsConnected(false);
          setIsConnecting(false);
        }
        return;
      }
      
      // It's a data update
      // Update connection status
      setIsConnected(true);
      setIsConnecting(false);
      setLastUpdateTime(new Date());
      
      // Handle different mutation types
      const map = participantsRef.current;
      
      if (update.transition === 'update' && update.result) {
        // Update existing participant
        const participant = update.result as Participant;
        map.set(participant._id, participant);
      } else if (update.transition === 'appear' && update.result) {
        // New participant added
        const participant = update.result as Participant;
        map.set(participant._id, participant);
      } else if (update.transition === 'disappear') {
        // Participant deleted
        map.delete(update.documentId);
      }
      
      // Update state with new values
      setParticipants(Array.from(map.values()));
    });
    
    // Update connection status and quality periodically
    const statusInterval = setInterval(() => {
      const status = connectionManager.getConnectionStatus();
      // Only update to false if we're explicitly disconnected
      if (!status.isConnected) {
        setIsConnected(false);
      }
      setConnectionQuality(status.quality);
      
      // Update metrics
      const currentMetrics = connectionManager.getCurrentMetrics();
      setMetrics({
        latency: currentMetrics.latency.length ? 
          currentMetrics.latency.reduce((sum, val) => sum + val, 0) / currentMetrics.latency.length : 0,
        successRate: currentMetrics.successRate,
        updateFrequency: currentMetrics.updateFrequency
      });
    }, 2000);
    
    // Clean up on unmount
    return () => {
      unsubscribe();
      clearInterval(statusInterval);
    };
  }, [initialParticipants, query]);
  
  return {
    participants,
    isConnected,
    isConnecting,
    connectionQuality,
    lastUpdateTime,
    metrics,
    applyOptimisticUpdate,
    applyOptimisticDelete,
    reconnect: connectionManager.manualReconnect.bind(connectionManager)
  };
} 