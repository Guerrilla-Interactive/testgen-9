"use client";

import { useState } from "react";
import { stegaClean } from "next-sanity";
import { Loader2, Search, Trophy, ArrowUpDown } from "lucide-react";
import { Modal } from "./modal";
import { AddParticipantForm } from "./add-participant-form";
import { useGlobalContext } from "@/features/context/global-context";
import { useEnhancedRealTimeParticipants } from "./enhanced-real-time-participants";
import { AdvancedConnectionIndicator } from "./advanced-connection-indicator";
import { optimisticEditParticipant, optimisticDeleteParticipant } from "./optimistic-actions";
import { type Participant, type SortOption } from "./types";

// Main component interface
interface EnhancedScoreboardProps {
  participants: Participant[];
  initialSort: SortOption;
  title?: string;
  participantsQuery?: string;
}

/**
 * Enhanced Scoreboard Component with optimized real-time performance
 * 
 * Features:
 * - Adaptive connection management
 * - Intelligent batching of updates
 * - Optimistic UI updates
 * - Performance metrics and visual feedback
 * - Network quality detection and adaptation
 */
export default function EnhancedScoreboard({
  participants,
  initialSort,
  title,
  participantsQuery,
}: EnhancedScoreboardProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>(initialSort);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { setIsScoreboardEditing } = useGlobalContext();
  
  // Use our enhanced real-time participants hook with optimistic updates
  const {
    participants: realTimeParticipants,
    isConnected,
    isConnecting,
    connectionQuality,
    lastUpdateTime,
    metrics,
    applyOptimisticUpdate,
    applyOptimisticDelete,
    reconnect
  } = useEnhancedRealTimeParticipants(
    participants,
    participantsQuery
  );
  
  // Handle search
  const filteredParticipants = realTimeParticipants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort participants based on the selected option
  const getSortedParticipants = () => {
    const sortedParticipants = [...filteredParticipants];

    switch (currentSort) {
      case "latest":
        return sortedParticipants.sort((a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        );
      case "highest":
        return sortedParticipants.sort((a, b) => b.score - a.score);
      case "lowest":
        return sortedParticipants.sort((a, b) => a.score - b.score);
      case "alphabetical":
        return sortedParticipants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      default:
        return sortedParticipants;
    }
  };
  
  // Get sorted participants
  const sortedParticipants = getSortedParticipants();
  
  // Handle sort change
  const handleSortChange = (newSort: SortOption) => {
    if (newSort === currentSort) return;
    setCurrentSort(newSort);
  };
  
  // Handle opening the add participant modal
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  
  // Handle closing the add participant modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  
  // Handle optimistic edit with proper UI feedback
  const handleEdit = async (id: string, name: string, score: number) => {
    setIsScoreboardEditing(true);
    const result = await optimisticEditParticipant(id, name, score, applyOptimisticUpdate);
    
    if (result.error) {
      console.error("Failed to update participant:", result.error);
      // Keep edit mode if there's an error
    } else {
      // Close edit mode on success
      setIsScoreboardEditing(false);
    }
    
    return result;
  };
  
  // Handle optimistic delete with proper UI feedback
  const handleDelete = async (id: string) => {
    const result = await optimisticDeleteParticipant(id, applyOptimisticDelete);
    
    if (result.error) {
      console.error("Failed to delete participant:", result.error);
    }
    
    return result;
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {title ? stegaClean(title) : "Scoreboard"}
              <AdvancedConnectionIndicator
                isConnected={isConnected}
                isConnecting={isConnecting}
                connectionQuality={connectionQuality}
                lastUpdateTime={lastUpdateTime}
                metrics={metrics}
                position="header"
                onReconnect={reconnect}
              />
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search bar */}
              <div className="relative w-full md:w-48 lg:w-64">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search participants"
                />
              </div>

              {/* Sort options */}
              <div className="flex flex-wrap items-center bg-white rounded-md border border-gray-200 p-1 gap-0.5">
                <ArrowUpDown className="h-4 w-4 text-gray-500 ml-2 mr-1 hidden md:inline" aria-hidden="true" />
                <button
                  onClick={() => handleSortChange("latest")}
                  className={`rounded-md px-3 py-1.5 text-sm transition-all duration-75 cursor-pointer ${currentSort === "latest"
                    ? "bg-blue-100 font-medium text-blue-800 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                  aria-pressed={currentSort === "latest"}
                >
                  Latest
                </button>
                <button
                  onClick={() => handleSortChange("highest")}
                  className={`rounded-md px-3 py-1.5 text-sm transition-all duration-75 cursor-pointer ${currentSort === "highest"
                    ? "bg-blue-100 font-medium text-blue-800 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                  aria-pressed={currentSort === "highest"}
                >
                  Highest
                </button>
                <button
                  onClick={() => handleSortChange("lowest")}
                  className={`rounded-md px-3 py-1.5 text-sm transition-all duration-75 cursor-pointer ${currentSort === "lowest"
                    ? "bg-blue-100 font-medium text-blue-800 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                  aria-pressed={currentSort === "lowest"}
                  aria-label="Sort by lowest score"
                >
                  Lowest
                </button>
                <button
                  onClick={() => handleSortChange("alphabetical")}
                  className={`rounded-md px-3 py-1.5 text-sm transition-all duration-75 cursor-pointer ${currentSort === "alphabetical"
                    ? "bg-blue-100 font-medium text-blue-800 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                  aria-pressed={currentSort === "alphabetical"}
                >
                  A-Z
                </button>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-75 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto cursor-pointer active:translate-y-0.5"
                aria-label="Add new participant"
              >
                <span className="mr-2">+</span>
                Add Participant
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="px-4 sm:px-6 py-5">
          {/* Participant content area */}
          <div className="relative bg-gray-50 rounded-lg p-3 sm:p-6 border border-gray-100">
            {/* Loading state */}
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : sortedParticipants.length > 0 ? (
              <div className="space-y-3">
                {/* Participant list would go here - simplified for this example */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    {sortedParticipants.length} participants loaded with enhanced real-time performance.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    All participants are updated in real-time with optimistic UI updates for a faster perceived experience.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-3">
                  <Trophy className="h-6 w-6 text-blue-500" aria-hidden="true" />
                </div>
                <p className="text-gray-500 text-center mb-2">{searchTerm ? "No matching participants found." : "No participants yet."}</p>
                <p className="text-sm text-gray-400 text-center mb-3">{searchTerm ? "Try a different search term or clear your search." : "Add your first participant to get started!"}</p>
              </div>
            )}
          </div>

          {/* Stats summary with connection indicator */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
            <h4 className="mb-3 text-sm font-medium text-gray-700">Connection Status</h4>
            <AdvancedConnectionIndicator
              isConnected={isConnected}
              isConnecting={isConnecting}
              connectionQuality={connectionQuality}
              lastUpdateTime={lastUpdateTime}
              metrics={metrics}
              position="stats"
              onReconnect={reconnect}
            />
          </div>
        </div>
      </div>

      {/* Modal for adding new participants */}
      <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <AddParticipantForm 
          onClose={handleCloseAddModal} 
          applyOptimisticUpdate={(participant) => {
            // Add the participant to the local state optimistically
            applyOptimisticUpdate(participant)
          }}
        />
      </Modal>
    </div>
  );
} 