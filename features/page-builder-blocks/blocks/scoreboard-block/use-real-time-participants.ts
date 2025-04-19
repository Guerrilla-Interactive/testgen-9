"use client";

import { useState, useEffect, useRef } from 'react';
import { listenToParticipantUpdates } from './real-time-updates';
import { type Participant } from './types';

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
      },
      query
    );
    
    // Set the connected state after a short delay
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);
    
    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
      clearTimeout(connectTimer);
      setIsConnected(false);
    };
  }, [initialParticipants, query]); // Re-subscribe when query changes
  
  // Return the current state
  return {
    participants,
    isConnected,
    lastUpdateTime: lastUpdateTime.current,
  };
} 