"use client";

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { type Participant } from './types';

// Create a client configured to use SSE (Server-Sent Events)
export const liveClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: "sk06vVSaC9Y63epyc9mQ1Olz6uDxKeRE2phQNOehwwA8zcsbMEJtUuMOiG1Ac0dbFKATxs3j5lLU8H9P4Sg8tL4GUMOpJ2NRd4ymEgArFHrGYL7bkgmEEE7LqwcgF78W6rBlr9uRvfnVY3PF0ujE5NOSkfzSzJqYHgBZbTT9LTd7KezQz6L2",
  useCdn: false, // We need to bypass the CDN for real-time data
  perspective: 'published', // Get published content
});

// Default query to listen for changes on participant documents
const DEFAULT_PARTICIPANTS_QUERY = '*[_type == "participant"]';

interface MutationPayload {
  documentId: string;
  transition: string; // 'update', 'appear', or 'disappear'
  result?: Participant; // The document after mutation
  mutations: any[]; // Array of mutations as submitted
  timestamp: string; // When the mutation occurred
}

type UpdateListener = (participants: Participant[]) => void;

export function listenToParticipantUpdates(
  initialParticipants: Participant[],
  onUpdate: UpdateListener,
  query?: string
) {
  // Use provided query or default to all participants
  const listenQuery = query || DEFAULT_PARTICIPANTS_QUERY;

  // Create a Map to store the current state of participants
  let currentParticipants = new Map<string, Participant>();
  
  // Initialize the map with the initial participants
  initialParticipants.forEach(participant => {
    currentParticipants.set(participant._id, participant);
  });

  // Helper function to convert Map to array
  const getParticipantsArray = () => Array.from(currentParticipants.values());
  
  // Subscribe to real-time updates
  const subscription = liveClient.listen(listenQuery)
    .subscribe({
      next: (update) => {
        // Handle different types of mutations
        const payload = update as unknown as MutationPayload;
        
        if (payload.transition === 'update' && payload.result) {
          // Update existing participant
          currentParticipants.set(payload.documentId, payload.result);
        } else if (payload.transition === 'appear' && payload.result) {
          // New participant added
          currentParticipants.set(payload.documentId, payload.result);
        } else if (payload.transition === 'disappear') {
          // Participant deleted
          currentParticipants.delete(payload.documentId);
        }
        
        // Call the update callback with the new array of participants
        onUpdate(getParticipantsArray());
      },
      error: (err) => {
        console.error('Error in real-time updates:', err);
      }
    });
  
  // Return the subscription so it can be unsubscribed later
  return {
    unsubscribe: () => subscription.unsubscribe(),
    getCurrentParticipants: getParticipantsArray
  };
} 