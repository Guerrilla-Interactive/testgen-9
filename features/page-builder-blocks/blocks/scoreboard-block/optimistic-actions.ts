"use client";

import { 
  addParticipantAction, 
  editParticipantAction, 
  deleteParticipantAction 
} from "./actions";
import { type Participant } from "./types";

interface OptimisticStore {
  pendingOperations: Map<string, any>;
  generateOptimisticId: () => string;
}

// Store for tracking optimistic updates
const optimisticStore: OptimisticStore = {
  pendingOperations: new Map(),
  generateOptimisticId: () => `optimistic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
};

/**
 * Add a participant with optimistic UI update.
 * The UI will update immediately while the server action runs in the background.
 * 
 * @param name The participant's name
 * @param score The participant's score
 * @param applyOptimisticUpdate Function to apply optimistic update to UI
 * @returns Result of the server action
 */
export async function optimisticAddParticipant(
  name: string,
  score: number,
  applyOptimisticUpdate: (participant: Participant) => void
): Promise<{ success?: boolean; error?: string; id?: string }> {
  // Generate a temporary ID for the optimistic update
  const optimisticId = optimisticStore.generateOptimisticId();
  
  // Create an optimistic participant
  const optimisticParticipant: Participant = {
    _id: optimisticId,
    _createdAt: new Date().toISOString(),
    name: name,
    score: score,
    _isOptimistic: true // Flag to identify optimistic updates
  };
  
  // Store the pending operation
  optimisticStore.pendingOperations.set(optimisticId, {
    type: 'add',
    data: optimisticParticipant
  });
  
  // Apply optimistic update to UI
  applyOptimisticUpdate(optimisticParticipant);
  
  try {
    // Call the actual server action
    const result = await addParticipantAction({ name, score });
    
    // Clean up the pending operation
    optimisticStore.pendingOperations.delete(optimisticId);
    
    return result;
  } catch (error) {
    // On error, clean up the pending operation
    optimisticStore.pendingOperations.delete(optimisticId);
    
    return { 
      error: error instanceof Error 
        ? error.message 
        : "Failed to add participant" 
    };
  }
}

/**
 * Edit a participant with optimistic UI update.
 * The UI will update immediately while the server action runs in the background.
 * 
 * @param id The participant's ID
 * @param name The updated name
 * @param score The updated score
 * @param applyOptimisticUpdate Function to apply optimistic update to UI
 * @returns Result of the server action
 */
export async function optimisticEditParticipant(
  id: string,
  name: string,
  score: number,
  applyOptimisticUpdate: (id: string, update: Partial<Participant>) => void
): Promise<{ success?: boolean; error?: string }> {
  // Create an update payload
  const updatePayload = {
    name,
    score,
    _updatedAt: new Date().toISOString(),
    _isOptimistic: true
  };
  
  // Store the pending operation
  optimisticStore.pendingOperations.set(id, {
    type: 'edit',
    data: updatePayload
  });
  
  // Apply optimistic update to UI
  applyOptimisticUpdate(id, updatePayload);
  
  try {
    // Call the actual server action
    const result = await editParticipantAction({ id, name, score });
    
    // Clean up the pending operation
    optimisticStore.pendingOperations.delete(id);
    
    return result;
  } catch (error) {
    // On error, clean up the pending operation
    optimisticStore.pendingOperations.delete(id);
    
    return { 
      error: error instanceof Error 
        ? error.message 
        : "Failed to update participant" 
    };
  }
}

/**
 * Delete a participant with optimistic UI update.
 * The UI will update immediately while the server action runs in the background.
 * 
 * @param id The participant's ID
 * @param applyOptimisticDelete Function to apply optimistic delete to UI
 * @returns Result of the server action
 */
export async function optimisticDeleteParticipant(
  id: string,
  applyOptimisticDelete: (id: string) => void
): Promise<{ success?: boolean; error?: string }> {
  // Store the pending operation
  optimisticStore.pendingOperations.set(id, {
    type: 'delete',
    data: { id }
  });
  
  // Apply optimistic update to UI
  applyOptimisticDelete(id);
  
  try {
    // Call the actual server action
    const result = await deleteParticipantAction({ id });
    
    // Clean up the pending operation
    optimisticStore.pendingOperations.delete(id);
    
    return result;
  } catch (error) {
    // On error, clean up the pending operation
    optimisticStore.pendingOperations.delete(id);
    
    return { 
      error: error instanceof Error 
        ? error.message 
        : "Failed to delete participant" 
    };
  }
}

/**
 * Utility function to check if a participant object is an optimistic update
 */
export function isOptimisticParticipant(participant: Participant): boolean {
  return Boolean(participant._isOptimistic);
} 