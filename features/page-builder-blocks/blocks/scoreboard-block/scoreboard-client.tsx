"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { stegaClean } from "next-sanity";
import { Search, Trophy, Medal, Award, Star, ChevronUp, ChevronDown, Loader2, Info, Edit, Check, X, Save, UserPlus } from "lucide-react";
import { editParticipantAction } from "./actions";
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

// Fixed date formatter function that doesn't depend on locale
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use ISO-style formatting (YYYY-MM-DD HH:MM:SS)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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

    // Handle opening the add participant modal
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Handle closing the add participant modal
    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <section className="container mx-auto px-4 py-8">
            {title && (
                <h2 className="mb-6 text-center text-3xl font-bold">
                    {stegaClean(title)}
                </h2>
            )}

            {/* Button to add a new participant */}
            <div className="mb-6 flex justify-end">
                <button
                    onClick={handleOpenAddModal}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Add new participant"
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Participant
                </button>
            </div>

            {/* Display existing participants */}
            <div className="mt-8">
                <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex items-center">
                        <h3 className="text-xl font-semibold">Current Scores</h3>

                        {/* Color legend toggle button */}
                        <button
                            onClick={() => setShowColorLegend(!showColorLegend)}
                            className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            aria-label="Show rank color explanation"
                        >
                            <Info className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search bar */}
                        <div className="relative w-full max-w-xs">
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
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <div className="flex space-x-2">
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
                        </div>
                    </div>
                </div>

                {/* Color legend explanation - conditionally shown */}
                {showColorLegend && (
                    <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                        <h4 className="mb-2 font-medium">Color Legend</h4>
                        <p className="mb-2">The background colors indicate a participant's rank based on their score:</p>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center rounded-md bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 px-3 py-1">
                                <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                                <span>1st Place (Gold)</span>
                            </div>
                            <div className="flex items-center rounded-md bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 px-3 py-1">
                                <Medal className="mr-2 h-4 w-4 text-gray-400" />
                                <span>2nd Place (Silver)</span>
                            </div>
                            <div className="flex items-center rounded-md bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-600 px-3 py-1">
                                <Award className="mr-2 h-4 w-4 text-amber-700" />
                                <span>3rd Place (Bronze)</span>
                            </div>
                        </div>
                        <p className="mt-2 text-xs">Note: Rankings are always based on score, regardless of current sort order.</p>
                    </div>
                )}

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex h-40 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) : sortedParticipants.length > 0 ? (
                    <ul className="space-y-2">
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
                                                        {formatDate(participant._createdAt)}
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

                                                    <button
                                                        onClick={() => handleEditClick(participant)}
                                                        className="ml-2 rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                                                        aria-label="Edit participant"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
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
                    <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
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

                {/* Stats summary - show only when there are participants */}
                {!isLoading && sortedParticipants.length > 0 && (
                    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">Scoreboard Stats</h4>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                                <p className="text-xs text-gray-500">Participants</p>
                                <p className="text-lg font-semibold">{sortedParticipants.length}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Top Score</p>
                                <p className="text-lg font-semibold">
                                    {maxScore}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Average Score</p>
                                <p className="text-lg font-semibold">
                                    {Math.round(sortedParticipants.reduce((sum, p) => sum + p.score, 0) / sortedParticipants.length)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Latest Entry</p>
                                <p className="text-sm font-semibold">
                                    {formatDate(sortedParticipants.sort((a, b) =>
                                        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
                                    )[0]._createdAt).split(' ')[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for adding new participants */}
            <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
                <AddParticipantForm onClose={handleCloseAddModal} />
            </Modal>
        </section>
    );
} 