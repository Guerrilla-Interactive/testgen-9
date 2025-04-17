import { stegaClean } from "next-sanity";

import { PARTICIPANTS_QUERY } from "@/sanity/desk-organized-sanity-utilities/participant/participant.document-queries";
import { AddParticipantForm } from "./add-participant-form"; // We'll create this next
import { client } from "@/sanity/lib/client";


// Define the props if ScoreboardProps doesn't exist or needs adjustment
interface ScoreboardProps {
  title?: string;
  // Add other potential props from your schema if needed
}

export default async function ScoreboardBlockComponent(
  props: Partial<ScoreboardProps>,
) {
  const { title } = props;

  // Fetch participants
  const participants: Participant[] =
    await client.fetch<Participant[]>(PARTICIPANTS_QUERY);

  return (
    <section className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="mb-6 text-center text-3xl font-bold">
          {stegaClean(title)}
        </h2>
      )}

      {/* Form to add new participants */}
      <AddParticipantForm />

      {/* Display existing participants */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">Current Scores</h3>
        {participants && participants.length > 0 ? (
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant._id}
                className="flex justify-between rounded border bg-white p-3 shadow-sm"
              >
                <span className="font-medium">{stegaClean(participant.name)}</span>
                <span className="text-gray-700">{participant.score}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No participants yet.</p>
        )}
      </div>
    </section>
  );
}

// Define a basic Participant type if you don't have one
// You might want to move this to a central types file (e.g., @/types/index.ts)
/*
export interface Participant {
  _id: string;
  _createdAt: string;
  name: string;
  score: number;
  createdAt?: string; // Optional based on your query
}
*/
