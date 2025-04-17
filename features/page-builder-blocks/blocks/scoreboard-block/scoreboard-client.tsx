"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { stegaClean } from "next-sanity";
import { Search, Trophy, Medal, Award, Star, ChevronUp, ChevronDown, Loader2, Info, Edit, Check, X, Save, UserPlus, Trash2, AlertTriangle } from "lucide-react";
import { editParticipantAction, deleteParticipantAction } from "./actions";
import { Modal } from "./modal";
import { AddParticipantForm } from "./add-participant-form";

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
            return <Trophy className="h-5 w-5  text-yellow-500" aria-hidden="true" />;
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
            return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 shadow-md"; // Gold - more vibrant
        case 2:
            return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300"; // Silver
        case 3:
            return "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-600"; // Bronze - more brownish
        default:
            return "bg-white"; // Regular participants
    }
};

export default function ScoreboardClient({
    participants,
    initialSort,
    title,
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

    // Find the highest score for relative bar scaling
    const maxScore = useMemo(() => {
        if (!participants.length) return 0;
        return Math.max(...participants.map(p => p.score));
    }, [participants]);

    // Calculate score-based ranks for all participants
    // This will give us a map of participant IDs to their ranks based on score
    const scoreBasedRanks = useMemo(() => {
        const scoreRankMap = new Map<string, number>();

        // Create a copy of participants sorted by score (highest first)
        const sortedByScore = [...participants].sort((a, b) => b.score - a.score);

        // Assign ranks (1-based, so 1st place is rank 1)
        sortedByScore.forEach((participant, index) => {
            scoreRankMap.set(participant._id, index + 1);
        });

        return scoreRankMap;
    }, [participants]);

    // State to trigger time updates
    const [timeRefresh, setTimeRefresh] = useState(0);

    // Set up interval to update relative times in real-time
    useEffect(() => {
        // Function to check if any timestamps are recent enough to need second-level updates
        const hasRecentTimestamps = () => {
            if (!participants || participants.length === 0) return false;

            // Check if any participant was created less than 60 seconds ago
            const now = new Date().getTime();
            return participants.some(participant => {
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
    }, [participants, timeRefresh]); // Re-evaluate when participants change or after each refresh

    // Simulate loading effect for better UX
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            setAnimateItems(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentSort]); // Reset loading when sort changes

    // Handle search
    const filteredParticipants = participants.filter(participant =>
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

    // Handle edit button click
    const handleEditClick = (participant: Participant) => {
        setEditingParticipant(participant._id);
        setEditName(participant.name);
        setEditScore(participant.score.toString());
        setEditError(null);
        setEditSuccess(false);
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingParticipant(null);
        setEditError(null);
    };

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
            } else {
                setEditSuccess(true);
                // Reset edit state after a delay
                setTimeout(() => {
                    setEditingParticipant(null);
                    setEditError(null);
                    setEditSuccess(false);
                }, 1500);
            }
        });
    };

    // Handle delete button click
    const handleDeleteClick = (id: string) => {
        setParticipantToDelete(id);
        setShowDeleteConfirm(true);
        setDeleteError(null);
    };

    // Handle cancel delete
    const handleCancelDelete = () => {
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
            } else {
                setShowDeleteConfirm(false);
                setParticipantToDelete(null);
                // Any editing state should also be cleared if we were deleting while editing
                if (editingParticipant === participantToDelete) {
                    setEditingParticipant(null);
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

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Main Card Container */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header with title and action button */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {title ? stegaClean(title) : "Scoreboard"}
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                            {/* Search bar */}
                            <div className="relative w-full md:w-48 lg:w-64">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Search participants..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Sort options */}
                            <div className="flex items-center bg-white rounded-md border border-gray-200 p-1">
                                <span className="text-sm text-gray-500 ml-2 mr-1 hidden md:inline">Sort:</span>
                                <button
                                    onClick={() => handleSortChange("latest")}
                                    className={`rounded-md px-2 py-1 text-sm transition-colors ${currentSort === "latest"
                                        ? "bg-blue-100 font-medium text-blue-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    Latest
                                </button>
                                <button
                                    onClick={() => handleSortChange("highest")}
                                    className={`rounded-md px-2 py-1 text-sm transition-colors ${currentSort === "highest"
                                        ? "bg-blue-100 font-medium text-blue-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    Highest
                                </button>
                                <button
                                    onClick={() => handleSortChange("lowest")}
                                    className={`rounded-md px-2 py-1 text-sm transition-colors ${currentSort === "lowest"
                                        ? "bg-blue-100 font-medium text-blue-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    aria-label="Sort by lowest score"
                                >
                                    Lowest
                                </button>
                                <button
                                    onClick={() => handleSortChange("alphabetical")}
                                    className={`rounded-md px-2 py-1 text-sm transition-colors ${currentSort === "alphabetical"
                                        ? "bg-blue-100 font-medium text-blue-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    A-Z
                                </button>
                            </div>

                            <button
                                onClick={handleOpenAddModal}
                                className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
                                aria-label="Add new participant"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add New Participant
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content area */}
                <div className="px-6 py-5">


                    {/* Participant content area */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        {/* Loading state */}
                        {isLoading ? (
                            <div className="flex h-40 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : sortedParticipants.length > 0 ? (
                            <ul className="space-y-3">
                                {sortedParticipants.map((participant, displayIndex) => {
                                    // Get this participant's score-based rank (1-based)
                                    const scoreRank = scoreBasedRanks.get(participant._id) || 999;
                                    const isEditing = editingParticipant === participant._id;

                                    return (
                                        <li
                                            key={participant._id}
                                            className={`flex flex-col transform rounded-lg border p-4 shadow-sm transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${getPositionClass(scoreRank)
                                                } ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                                            style={{ transitionDelay: `${displayIndex * 50}ms` }}
                                        >
                                            {isEditing ? (
                                                // Edit mode
                                                <>
                                                    <div className="mb-3 flex items-center space-x-3 sm:mb-0">
                                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white border shadow-sm">
                                                            {getRankIcon(scoreRank) || (
                                                                <span className="text-sm font-semibold text-gray-700">{scoreRank}</span>
                                                            )}
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Enter name"
                                                            disabled={isPending}
                                                        />
                                                    </div>

                                                    <div className="flex items-center space-x-3">
                                                        <input
                                                            type="number"
                                                            value={editScore}
                                                            onChange={(e) => setEditScore(e.target.value)}
                                                            className="w-20 rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Score"
                                                            min="0"
                                                            disabled={isPending}
                                                        />

                                                        <div className="flex space-x-2">
                                                            {isPending ? (
                                                                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                                            ) : editSuccess ? (
                                                                <Check className="h-5 w-5 text-green-500" />
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleDeleteClick(participant._id)}
                                                                        className="rounded-md bg-red-100 p-1 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                                                        disabled={isPending}
                                                                        aria-label="Delete participant"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSaveEdit(participant._id)}
                                                                        className="rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                                                        disabled={isPending}
                                                                        aria-label="Save changes"
                                                                    >
                                                                        <Save className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={handleCancelEdit}
                                                                        className="rounded-md bg-gray-200 p-1 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
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
                                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white border shadow-sm">
                                                            {getRankIcon(scoreRank) || (
                                                                <span className="text-sm font-semibold text-gray-700">{scoreRank}</span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{stegaClean(participant.name)}</span>
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

                                                            <div className="hidden h-3 w-28 overflow-hidden rounded-full bg-gray-200 sm:block">
                                                                <div
                                                                    className={`h-full transition-all duration-500 ${scoreRank === 1
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
                                                                    onClick={() => handleEditClick(participant)}
                                                                    className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
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
                                                <div className="mt-2 w-full rounded-md bg-red-50 p-2 text-xs text-red-800">
                                                    {editError}
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white">
                                <p className="text-gray-500">No participants found.</p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stats summary - show only when there are participants */}
                    {!isLoading && sortedParticipants.length > 0 && (
                        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <h4 className="mb-3 text-sm font-medium text-gray-700">Scoreboard Stats</h4>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-md bg-blue-50 p-3">
                                    <p className="text-xs text-gray-500">Participants</p>
                                    <p className="text-lg font-semibold text-blue-800">{sortedParticipants.length}</p>
                                </div>
                                <div className="rounded-md bg-green-50 p-3">
                                    <p className="text-xs text-gray-500">Top Score</p>
                                    <p className="text-lg font-semibold text-green-800">
                                        {maxScore}
                                    </p>
                                </div>
                                <div className="rounded-md bg-purple-50 p-3">
                                    <p className="text-xs text-gray-500">Average Score</p>
                                    <p className="text-lg font-semibold text-purple-800">
                                        {Math.round(sortedParticipants.reduce((sum, p) => sum + p.score, 0) / sortedParticipants.length)}
                                    </p>
                                </div>
                                <div className="rounded-md bg-amber-50 p-3">
                                    <p className="text-xs text-gray-500">Latest Entry</p>
                                    <p className="text-sm font-semibold text-amber-800">
                                        {getRelativeTime(sortedParticipants.sort((a, b) =>
                                            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
                                        )[0]._createdAt)}
                                    </p>
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
        </div>
    );
} 