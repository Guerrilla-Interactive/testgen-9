"use client";

import { useState, useEffect, useRef } from 'react';
import { listenToParticipantUpdates } from './real-time-updates';
import { type Participant } from './types';

// Define the interval for sending heartbeats (15 seconds)
const HEARTBEAT_INTERVAL = 15000;
// Define the max time without receiving a heartbeat before considering connection unstable (30 seconds)
const MAX_HEARTBEAT_DELAY = 30000;

/**
 * Custom hook for managing real-time participant data
 * 
 * @param initialParticipants - The initial participants data from server
 * @param query - Optional GROQ query for listening to specific participants
 * @returns An object containing the current participants and loading state
 */
export function useRealTimeParticipants(
  initialParticipants: Participant[],
  query?: string
) {
  // State to hold the current participants data
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  
  // State to track if real-time updates are active
  const [isConnected, setIsConnected] = useState(false);
  
  // Ref to track when we get updates from the server
  const lastUpdateTime = useRef<Date | null>(null);
  
  // Ref to track the last heartbeat time from the server
  const lastHeartbeatTime = useRef<number>(Date.now());
  
  // Initialize real-time updates
  useEffect(() => {
    // Only set up real-time updates in the browser
    if (typeof window === 'undefined') return;
    
    // Start with the initial participants
    setParticipants(initialParticipants);
    
    // Set up the real-time subscription
    const { unsubscribe } = listenToParticipantUpdates(
      initialParticipants,
      (updatedParticipants) => {
        // Update our local state with the new data
        setParticipants(updatedParticipants);
        setIsConnected(true);
        lastUpdateTime.current = new Date();
        // Update the heartbeat time whenever we get any update from the server
        lastHeartbeatTime.current = Date.now();
      },
      query
    );
    
    // Set up a heartbeat checker that runs every 5 seconds
    const heartbeatChecker = setInterval(() => {
      // Calculate time since last heartbeat
      const timeSinceLastHeartbeat = Date.now() - lastHeartbeatTime.current;
      
      // If it's been too long since a heartbeat, consider the connection unstable
      if (timeSinceLastHeartbeat > MAX_HEARTBEAT_DELAY) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    }, 5000);
    
    // Set the connected state after a short delay
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      lastHeartbeatTime.current = Date.now(); // Initialize heartbeat time
    }, 1000);
    
    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
      clearTimeout(connectTimer);
      clearInterval(heartbeatChecker);
      setIsConnected(false);
    };
  }, [initialParticipants, query]); // Re-subscribe when query changes
  
  // Return the current state
  return {
    participants,
    isConnected,
    lastUpdateTime: lastUpdateTime.current,
    lastHeartbeatTime: lastHeartbeatTime.current
  };
} 