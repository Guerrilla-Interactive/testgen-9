"use client"; // This component needs client-side interactivity for the form

import { useState, useTransition } from "react";
import { addParticipantAction } from "./actions"; // We'll create this server action

export function AddParticipantForm() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error/success messages
    setSuccess(null);

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
        setSuccess("Participant added successfully!");
        // Reset form fields
        setName("");
        setScore("");
        // Optionally clear success message after a delay
        setTimeout(() => setSuccess(null), 3000);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded border bg-gray-50 p-4 shadow-sm"
    >
      <h3 className="mb-3 text-lg font-semibold">Add New Participant</h3>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-grow">
          <label htmlFor="participant-name" className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="participant-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={isPending}
          />
        </div>
        <div className="w-24">
          <label htmlFor="participant-score" className="mb-1 block text-sm font-medium text-gray-700">
            Score
          </label>
          <input
            id="participant-score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            disabled={isPending}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </form>
  );
} 