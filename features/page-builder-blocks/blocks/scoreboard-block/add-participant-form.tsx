"use client"; // This component needs client-side interactivity for the form

import { useState, useTransition } from "react";
import { addParticipantAction } from "./actions"; // We'll create this server action
import { Loader2, PlusCircle, Check } from "lucide-react";

export function AddParticipantForm() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error/success messages
    setSuccess(null);
    setShowSuccessAnimation(false);

    const scoreNumber = parseInt(score, 10);

    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    if (isNaN(scoreNumber) || scoreNumber < 0) {
      setError("Score must be a non-negative number.");
      return;
    }

    startTransition(async () => {
      const result = await addParticipantAction({ name, score: scoreNumber });
      if (result.error) {
        setError(result.error);
      } else {
        // Show success animation
        setShowSuccessAnimation(true);
        setSuccess("Participant added successfully!");

        // Reset form fields
        setName("");
        setScore("");

        // Hide success message and animation after a delay
        setTimeout(() => {
          setSuccess(null);
          setShowSuccessAnimation(false);
        }, 3000);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300"
    >
      <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
        <PlusCircle className="mr-2 h-5 w-5 text-blue-500" />
        Add New Participant
      </h3>

      <div className="mb-4 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <label htmlFor="participant-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="participant-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter participant name"
            required
            disabled={isPending}
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="participant-score" className="mb-1.5 block text-sm font-medium text-gray-700">
            Score
          </label>
          <input
            id="participant-score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0"
            required
            min="0"
            disabled={isPending}
          />
        </div>

        <div className="flex items-end md:col-span-2">
          <button
            type="submit"
            className={`relative w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${showSuccessAnimation ? 'bg-green-600 hover:bg-green-700' : ''}`}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </span>
            ) : showSuccessAnimation ? (
              <span className="flex items-center justify-center">
                <Check className="mr-2 h-4 w-4" />
                Added!
              </span>
            ) : (
              "Add Entry"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {success && !error && (
        <div className="mt-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
          {success}
        </div>
      )}
    </form>
  );
} 