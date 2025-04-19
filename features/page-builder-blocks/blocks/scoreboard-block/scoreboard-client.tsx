"use client";

import { useState, useEffect, useMemo, useTransition, useRef } from "react";
import { stegaClean } from "next-sanity";
import { Search, Trophy, Medal, Award, Star, ChevronUp, ChevronDown, Loader2, Info, Edit, Check, X, Save, UserPlus, Trash2, AlertTriangle, ArrowUpDown } from "lucide-react";
import { editParticipantAction, deleteParticipantAction } from "./actions";
import { Modal } from "./modal";
import { AddParticipantForm } from "./add-participant-form";
import { useGlobalContext } from "@/features/context/global-context";
import { useRealTimeParticipants } from "./use-real-time-participants";
import { ConnectionStatusIndicator } from "./connection-status-indicator";

// Define types inline since there's an import issue
interface Participant {
    _id: string;
    _createdAt: string;
    name: string;
    score: number;
    createdAt?: string;
}

type SortOption = "latest" | "highest" | "lowest" | "alphabetical";

interface ScoreboardClientProps {
    participants: Participant[];
    initialSort: SortOption;
    title?: string;
    participantsQuery?: string;
}

// Format relative time like "2 minutes ago", "5 seconds ago", "3 hours ago", etc.
const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Less than a minute
    if (secondsDiff < 60) {
        return secondsDiff === 1 ? '1 second ago' : `${secondsDiff} seconds ago`;
    }

    // Less than an hour
    const minutesDiff = Math.floor(secondsDiff / 60);
    if (minutesDiff < 60) {
        return minutesDiff === 1 ? '1 minute ago' : `${minutesDiff} minutes ago`;
    }

    // Less than a day
    const hoursDiff = Math.floor(minutesDiff / 60);
    if (hoursDiff < 24) {
        return hoursDiff === 1 ? '1 hour ago' : `${hoursDiff} hours ago`;
    }

    // Less than a week
    const daysDiff = Math.floor(hoursDiff / 24);
    if (daysDiff < 7) {
        return daysDiff === 1 ? '1 day ago' : `${daysDiff} days ago`;
    }

    // Less than a month (4 weeks)
    const weeksDiff = Math.floor(daysDiff / 7);
    if (weeksDiff < 4) {
        return weeksDiff === 1 ? '1 week ago' : `${weeksDiff} weeks ago`;
    }

    // Less than a year
    const monthsDiff = Math.floor(daysDiff / 30);
    if (monthsDiff < 12) {
        return monthsDiff === 1 ? '1 month ago' : `${monthsDiff} months ago`;
    }

    // A year or more
    const yearsDiff = Math.floor(daysDiff / 365);
    return yearsDiff === 1 ? '1 year ago' : `${yearsDiff} years ago`;
};

// Get rank icon based on score-based rank
const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Trophy className="h-5 w-5 text-yellow-500" aria-hidden="true" />;
        case 2:
            return <Medal className="h-5 w-5 text-gray-400" aria-hidden="true" />;
        case 3:
            return <Award className="h-5 w-5 text-amber-700" aria-hidden="true" />;
        default:
            return null;
    }
};

// Get class name based on score-based rank - improved with more distinct colors
const getPositionClass = (rank: number) => {
    switch (rank) {
        case 1:
            return "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 shadow-sm"; // Gold - more vibrant
        case 2:
            return "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"; // Silver
        case 3:
            return "bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200"; // Bronze - more brownish
        default:
            return "bg-white hover:bg-gray-50 transition-colors duration-75 border border-gray-100"; // Regular participants with hover effect and subtle border
    }
};

export default function ScoreboardClient({
    participants,
    initialSort,
    title,
    participantsQuery,
}: ScoreboardClientProps) {
    // State for the current sort option
    const [currentSort, setCurrentSort] = useState<SortOption>(initialSort);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [animateItems, setAnimateItems] = useState(false);
    const [showColorLegend, setShowColorLegend] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Edit state
    const [editingParticipant, setEditingParticipant] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editScore, setEditScore] = useState("");
    const [editError, setEditError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [editSuccess, setEditSuccess] = useState(false);

    // Add delete confirmation state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [participantToDelete, setParticipantToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Ref to store score input elements
    const scoreInputRefs = useRef<Map<string, HTMLInputElement | null>>(new Map());
    
    // Ref to track the editing item container for outside click detection
    const editingItemRef = useRef<HTMLLIElement | null>(null);

    // Get global context setter
    const { setIsScoreboardEditing } = useGlobalContext();

    // Use real-time participants data
    const { participants: realTimeParticipants, isConnected, lastUpdateTime } = useRealTimeParticipants(
        participants,
        participantsQuery
    );
    
    // Use real-time data when available, otherwise use the initial data
    const currentParticipants = realTimeParticipants || participants;

    // Find the highest score for relative bar scaling
    const maxScore = useMemo(() => {
        if (!currentParticipants.length) return 0;
        return Math.max(...currentParticipants.map(p => p.score));
    }, [currentParticipants]);

    // Calculate score-based ranks for all participants
    // This will give us a map of participant IDs to their ranks based on score
    const scoreBasedRanks = useMemo(() => {
        const scoreRankMap = new Map<string, number>();

        // Create a copy of participants sorted by score (highest first)
        const sortedByScore = [...currentParticipants].sort((a, b) => b.score - a.score);

        // Assign ranks (1-based, so 1st place is rank 1)
        sortedByScore.forEach((participant, index) => {
            scoreRankMap.set(participant._id, index + 1);
        });

        return scoreRankMap;
    }, [currentParticipants]);

    // State to trigger time updates
    const [timeRefresh, setTimeRefresh] = useState(0);

    // Set up interval to update relative times in real-time
    useEffect(() => {
        // Function to check if any timestamps are recent enough to need second-level updates
        const hasRecentTimestamps = () => {
            if (!currentParticipants || currentParticipants.length === 0) return false;

            // Check if any participant was created less than 60 seconds ago
            const now = new Date().getTime();
            return currentParticipants.some(participant => {
                const createdTime = new Date(participant._createdAt).getTime();
                return (now - createdTime) < 60000; // Less than a minute
            });
        };

        // Determine update interval based on how recent the newest entries are
        const updateInterval = hasRecentTimestamps() ? 1000 : 60000; // 1 second or 1 minute

        // Set up the interval
        const timeInterval = setInterval(() => {
            setTimeRefresh(prev => prev + 1);
        }, updateInterval);

        // Clean up interval on unmount or when participants change
        return () => clearInterval(timeInterval);
    }, [currentParticipants, timeRefresh]); // Re-evaluate when participants change or after each refresh

    // Simulate loading effect for better UX
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            setAnimateItems(true);
        }, 50); // Ultra-fast loading

        return () => clearTimeout(timer);
    }, [currentSort]); // Reset loading when sort changes

    // Handle search
    const filteredParticipants = currentParticipants.filter(participant =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort participants based on the selected option (client-side)
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
        if (newSort === currentSort) return; // No change needed
        setAnimateItems(false);
        setCurrentSort(newSort);
    };

    // Create a memoized time formatter function that will update when timeRefresh changes
    const getRelativeTime = useMemo(() => {
        // Return a function that formats time strings, considering the current timeRefresh state
        return (dateString: string) => formatRelativeTime(dateString);
        // Re-create this function when timeRefresh changes
    }, [timeRefresh]);

    // Function to calculate score bar width as a percentage relative to max score
    const calculateScoreBarWidth = (score: number): string => {
        if (maxScore <= 0) return "0%";
        // If max score is more than zero, calculate percentage with safety fallback
        return `${Math.max(5, Math.min(100, (score / maxScore) * 100))}%`;
    };

    // Effect to focus the score input when editing starts
    useEffect(() => {
        if (editingParticipant) {
            // Use setTimeout to ensure focus happens after DOM update
            setTimeout(() => {
                const inputRef = scoreInputRefs.current.get(editingParticipant);
                inputRef?.focus();
            }, 0);
        }
    }, [editingParticipant]); // Run when editingParticipant changes

    // Handle edit button click
    const handleEditClick = (participant: Participant) => {
        setEditingParticipant(participant._id);
        setEditName(participant.name);
        setEditScore(participant.score.toString());
        setEditError(null);
        setEditSuccess(false);
        setIsScoreboardEditing(true); // Set global state to true
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingParticipant(null);
        setEditError(null);
        setIsScoreboardEditing(false); // Set global state to false
    };

    // Add click outside handler for editing
    useEffect(() => {
        if (!editingParticipant) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            // If clicking outside and not in delete confirmation modal
            if (
                editingItemRef.current && 
                !editingItemRef.current.contains(event.target as Node) && 
                !showDeleteConfirm
            ) {
                handleCancelEdit();
            }
        };
        
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingParticipant, showDeleteConfirm]);

    // Handle save edit
    const handleSaveEdit = (id: string) => {
        const scoreNumber = parseInt(editScore, 10);

        if (!editName.trim()) {
            setEditError("Name cannot be empty.");
            return;
        }

        if (isNaN(scoreNumber) || scoreNumber < 0) {
            setEditError("Score must be a non-negative number.");
            return;
        }

        startTransition(async () => {
            const result = await editParticipantAction({
                id,
                name: editName,
                score: scoreNumber
            });

            if (result.error) {
                setEditError(result.error);
                // Keep edit mode active on error
            } else {
                setEditSuccess(true);
                setTimeout(() => {
                    setEditingParticipant(null);
                    setEditError(null);
                    setEditSuccess(false);
                    setIsScoreboardEditing(false); // Set global state to false on success
                }, 300); // Ultra-fast success confirmation
            }
        });
    };

    // Handle delete button click
    const handleDeleteClick = (id: string) => {
        // Don't change global state yet, just show confirmation
        setParticipantToDelete(id);
        setShowDeleteConfirm(true);
        setDeleteError(null);
    };

    // Handle cancel delete
    const handleCancelDelete = () => {
        // If cancelling delete, we remain in edit mode, so don't change global state
        setShowDeleteConfirm(false);
        setParticipantToDelete(null);
        setDeleteError(null);
    };

    // Handle confirm delete
    const handleConfirmDelete = () => {
        if (!participantToDelete) return;
        setIsDeleting(true);
        setDeleteError(null);

        startTransition(async () => {
            const result = await deleteParticipantAction({
                id: participantToDelete
            });
            setIsDeleting(false);
            if (result.error) {
                setDeleteError(result.error);
                 // Keep edit mode active on error
            } else {
                setShowDeleteConfirm(false);
                const wasEditingThisItem = editingParticipant === participantToDelete;
                setParticipantToDelete(null);
                // If the deleted item was the one being edited, exit edit mode
                if (wasEditingThisItem) {
                    setEditingParticipant(null);
                    setIsScoreboardEditing(false); // Set global state to false
                }
            }
        });
    };

    // Handle opening the add participant modal
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Handle closing the add participant modal
    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    // Handle key down on score input
    const handleScoreInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (event.key === 'Enter' && !isPending) {
            event.preventDefault(); // Prevent potential form submission if wrapped in a form
            handleSaveEdit(id);
        }
    };

    // Add new state for the notification
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);

    // Show notification when an update is received
    useEffect(() => {
        if (lastUpdateTime) {
            // Show notification
            setShowUpdateNotification(true);
            
            // Hide after 3 seconds
            const timer = setTimeout(() => {
                setShowUpdateNotification(false);
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [lastUpdateTime]);

    // Notification component for real-time updates
    const UpdateNotification = () => {
        if (!showUpdateNotification) return null;
        
        return (
            <div 
                className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-lg p-4 z-50"
                style={{
                    animation: 'fadeInOut 3s ease-in-out',
                    opacity: showUpdateNotification ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            >
                <style jsx>{`
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translateY(10px); }
                        10% { opacity: 1; transform: translateY(0); }
                        90% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-10px); }
                    }
                `}</style>
                <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0 relative">
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-75 absolute" 
                             style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                        <div className="relative rounded-full h-2.5 w-2.5 bg-white"></div>
                    </div>
                    <div>
                        <p className="font-medium">Scoreboard Updated</p>
                        <p className="text-xs text-blue-100">
                            {lastUpdateTime ? `${lastUpdateTime.toLocaleTimeString()}` : ''}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Add a help text component that explains the real-time updates functionality
    const HelpText = () => {
        const [showHelp, setShowHelp] = useState(false);

        return (
            <div className="relative">
                <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="inline-flex items-center justify-center rounded-full p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label={showHelp ? "Hide real-time info" : "Show real-time info"}
                >
                    <Info className="h-4 w-4" />
                </button>

                {showHelp && (
                    <div className="absolute right-0 bottom-10 z-10 w-72 rounded-lg bg-white p-4 shadow-lg border border-gray-200 text-sm text-gray-600">
                        <div className="flex items-center mb-2">
                            <div className="flex-shrink-0 mr-2">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </div>
                            </div>
                            <p className="font-medium text-gray-900">Real-time Updates</p>
                        </div>
                        <p className="mb-2">
                            This scoreboard updates automatically when changes are made by anyone, without requiring a page refresh.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>New participants appear instantly</li>
                            <li>Score changes update in real-time</li>
                            <li>Deleted participants are removed automatically</li>
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Main Card Container - Removed overflow-hidden */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                {/* Header with title and action button */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            {title ? stegaClean(title) : "Scoreboard"}
                            <ConnectionStatusIndicator 
                                isConnected={isConnected}
                                lastUpdateTime={lastUpdateTime}
                                position="header"
                            />
                            <div className="ml-2">
                                <HelpText />
                            </div>
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
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add New Participant
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content area */}
                <div className="px-4 sm:px-6 py-5">
                    {/* Participant content area - Add relative positioning */}
                    <div className="relative bg-gray-50 rounded-lg p-3 sm:p-6 border border-gray-100">
                        {/* Loading state */}
                        {isLoading ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : sortedParticipants.length > 0 ? (
                            <ul role="list" aria-label="Participant list" className="space-y-3"> {/* Added ARIA role */}
                                {sortedParticipants.map((participant, displayIndex) => {
                                    // Get this participant's score-based rank (1-based)
                                    const scoreRank = scoreBasedRanks.get(participant._id) || 999;
                                    const isEditing = editingParticipant === participant._id;

                                    return (
                                        <li
                                            key={participant._id}
                                            ref={isEditing ? editingItemRef : null}
                                            className={`relative flex flex-col transform rounded-lg p-3 sm:p-4 shadow-sm transition-all duration-50 sm:flex-row sm:items-center sm:justify-between
                                                ${getPositionClass(scoreRank)} 
                                                ${isEditing 
                                                    ? 'scale-100 sm:scale-102 z-50 ' // Added ring for focus indication
                                                    : (animateItems ? "translate-y-0 opacity-100 cursor-pointer" : "translate-y-2 opacity-0 cursor-pointer")
                                                }
                                            `}
                                            onClick={!isEditing ? () => handleEditClick(participant) : undefined}
                                            style={{ 
                                                transitionDelay: animateItems ? `${Math.min(displayIndex * 10, 80)}ms` : '0ms' // Ultra-fast sequence
                                            }}
                                            tabIndex={!isEditing ? 0 : undefined}
                                            onKeyDown={(e) => {
                                                if (!isEditing && (e.key === 'Enter' || e.key === ' ')) {
                                                    e.preventDefault();
                                                    handleEditClick(participant);
                                                }
                                            }}
                                            aria-label={!isEditing ? `Edit ${participant.name} with score ${participant.score}` : undefined}
                                            role="button"
                                        >
                                            {isEditing ? (
                                                // Edit mode
                                                <>
                                                    <div className="mb-3 flex items-center space-x-3 sm:mb-0 w-full sm:w-auto">
                                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                                            {getRankIcon(scoreRank) || (
                                                                <span className="text-sm font-semibold text-gray-700">{scoreRank}</span>
                                                            )}
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className={`rounded-md px-3 py-2.5 text-sm shadow-sm w-full bg-white
                                                                ${scoreRank === 1 
                                                                    ? 'border border-yellow-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none' 
                                                                    : scoreRank === 2 
                                                                        ? 'border border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none' 
                                                                        : scoreRank === 3 
                                                                            ? 'border border-amber-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none' 
                                                                            : 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                                                                }`}
                                                            placeholder="Enter name"
                                                            disabled={isPending}
                                                            aria-label="Participant name"
                                                        />
                                                    </div>

                                                    <div className="flex flex-wrap items-center sm:space-x-3">
                                                        <div className="flex items-center mb-2 sm:mb-0 mr-2 sm:mr-0">
                                                            <label htmlFor={`score-${participant._id}`} className="sr-only">Score</label>
                                                            <input
                                                                id={`score-${participant._id}`}
                                                                type="number"
                                                                value={editScore}
                                                                onChange={(e) => setEditScore(e.target.value)}
                                                                onKeyDown={(e) => handleScoreInputKeyDown(e, participant._id)}
                                                                ref={(el) => {
                                                                    if (el) {
                                                                        scoreInputRefs.current.set(participant._id, el);
                                                                    }
                                                                }}
                                                                className={`w-24 sm:w-20 rounded-md px-3 mr-2.5  py-2.5 text-sm bg-white shadow-sm
                                                                    ${scoreRank === 1 
                                                                        ? 'border border-yellow-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none' 
                                                                        : scoreRank === 2 
                                                                            ? 'border border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none' 
                                                                            : scoreRank === 3 
                                                                                ? 'border border-amber-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none' 
                                                                                : 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                                                                    }`}
                                                                placeholder="Score"
                                                                min="0"
                                                                disabled={isPending}
                                                                aria-label="Participant score"
                                                            />
                                                        </div>

                                                        <div className="flex space-x-2">
                                                            {isPending ? (
                                                                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                                            ) : editSuccess ? (
                                                                <Check className="h-5 w-5 text-green-500" />
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleDeleteClick(participant._id)}
                                                                        className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 cursor-pointer active:translate-y-0.5"
                                                                        disabled={isPending}
                                                                        aria-label="Delete participant"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSaveEdit(participant._id)}
                                                                        className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer active:translate-y-0.5"
                                                                        disabled={isPending}
                                                                        aria-label="Save changes"
                                                                    >
                                                                        <Save className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={handleCancelEdit}
                                                                        className="rounded-md bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 cursor-pointer active:translate-y-0.5"
                                                                        disabled={isPending}
                                                                        aria-label="Cancel editing"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                // View mode
                                                <>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                                            {getRankIcon(scoreRank) || (
                                                                <span className="text-sm font-semibold text-gray-700">{scoreRank}</span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-800">{stegaClean(participant.name)}</span>
                                                            <span className="text-xs text-gray-500">
                                                                {getRelativeTime(participant._createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 flex items-center sm:mt-0">
                                                        <div className="flex items-center space-x-2">
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${scoreRank === 1
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : scoreRank === 2
                                                                    ? 'bg-gray-100 text-gray-800'
                                                                    : scoreRank === 3
                                                                        ? 'bg-orange-100 text-orange-800'
                                                                        : 'bg-blue-50 text-blue-800'
                                                                }`}>
                                                                {scoreRank === 1 && <Star className="mr-1 h-3 w-3" />}
                                                                {participant.score} pts
                                                            </span>

                                                            <div className="hidden h-3 w-20 sm:w-28 overflow-hidden rounded-full bg-gray-200 sm:block">
                                                                <div
                                                                    className={`h-full transition-all duration-150 ${scoreRank === 1
                                                                        ? 'bg-yellow-500'
                                                                        : scoreRank === 2
                                                                            ? 'bg-gray-400'
                                                                            : scoreRank === 3
                                                                                ? 'bg-orange-700'
                                                                                : 'bg-blue-500'
                                                                        }`}
                                                                    style={{ width: calculateScoreBarWidth(participant.score) }}
                                                                ></div>
                                                            </div>

                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditClick(participant);
                                                                    }}
                                                                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 cursor-pointer active:translate-y-0.5"
                                                                    aria-label="Edit participant"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Edit error message */}
                                            {isEditing && editError && (
                                                <div className="mt-2 w-full rounded-md bg-red-50 p-2 text-xs text-red-800 border border-red-200 animate-[pulse_0.5s_ease-in-out_infinite]">
                                                    {editError}
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-3">
                                    <Trophy className="h-6 w-6 text-blue-500" aria-hidden="true" />
                                </div>
                                <p className="text-gray-500 text-center mb-2">{searchTerm ? "No matching participants found." : "No participants yet."}</p>
                                <p className="text-sm text-gray-400 text-center mb-3">{searchTerm ? "Try a different search term or clear your search." : "Add your first participant to get started!"}</p>
                                {searchTerm ? (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="inline-flex items-center rounded-md px-3 py-1.5 bg-blue-50 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
                                    >
                                        <X className="h-3.5 w-3.5 mr-1.5" /> Clear search
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleOpenAddModal}
                                        className="inline-flex items-center rounded-md px-3 py-1.5 bg-blue-100 text-sm text-blue-700 hover:bg-blue-200 transition-colors"
                                    >
                                        <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Add Participant
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stats summary - show only when there are participants */}
                    {!isLoading && sortedParticipants.length > 0 && (
                        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
                            <h4 className="mb-3 text-sm font-medium text-gray-700">Scoreboard Stats</h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-4">
                                <div className="rounded-md bg-blue-50 p-3 border border-blue-100 transition-transform hover:scale-102">
                                    <p className="text-xs text-gray-500 mb-1">Participants</p>
                                    <p className="text-lg font-semibold text-blue-800">{sortedParticipants.length}</p>
                                </div>
                                <div className="rounded-md bg-green-50 p-3 border border-green-100 transition-transform hover:scale-102">
                                    <p className="text-xs text-gray-500 mb-1">Top Score</p>
                                    <p className="text-lg font-semibold text-green-800">
                                        {maxScore}
                                    </p>
                                </div>
                                <div className="rounded-md bg-purple-50 p-3 border border-purple-100 transition-transform hover:scale-102">
                                    <p className="text-xs text-gray-500 mb-1">Average Score</p>
                                    <p className="text-lg font-semibold text-purple-800">
                                        {Math.round(sortedParticipants.reduce((sum, p) => sum + p.score, 0) / sortedParticipants.length)}
                                    </p>
                                </div>
                                <div className="rounded-md bg-amber-50 p-3 border border-amber-100 transition-transform hover:scale-102">
                                    <p className="text-xs text-gray-500 mb-1">Latest Entry</p>
                                    <p className="text-sm font-semibold text-amber-800">
                                        {getRelativeTime(sortedParticipants.sort((a, b) =>
                                            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
                                        )[0]._createdAt)}
                                    </p>
                                </div>
                                <div className={`rounded-md p-3 border transition-colors duration-300 ${
                                    isConnected ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <p className="text-xs text-gray-500 mb-1">Connection Status</p>
                                    <ConnectionStatusIndicator 
                                        isConnected={isConnected}
                                        lastUpdateTime={lastUpdateTime}
                                        position="stats"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete confirmation modal */}
            <Modal isOpen={showDeleteConfirm} onClose={handleCancelDelete}>
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this participant? This action cannot be undone.
                    </p>

                    {deleteError && (
                        <div className="mb-4 text-center text-sm text-red-600 p-2 bg-red-50 rounded-md border border-red-100">
                            {deleteError}
                        </div>
                    )}

                    <div className="flex justify-center gap-3">
                        <button
                            onClick={handleCancelDelete}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <span className="flex items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </span>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal for adding new participants */}
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
                <AddParticipantForm onClose={handleCloseAddModal} />
            </Modal>

            {/* Real-time update notification */}
            {/* <UpdateNotification /> */}
        </div>
    );
} 