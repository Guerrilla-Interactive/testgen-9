import { stegaClean } from "next-sanity";

import { PARTICIPANTS_QUERY } from "@/sanity/desk-organized-sanity-utilities/participant/participant.document-queries";
import { client } from "@/sanity/lib/client";
import ScoreboardClient from "./scoreboard-client";
import { type Participant, type SortOption } from "./types";

// Define the props if ScoreboardProps doesn't exist or needs adjustment
interface ScoreboardProps {
  title?: string;
  defaultSort?: SortOption;
  // Add other potential props from your schema if needed
}

export default async function ScoreboardBlockComponent(
  props: Partial<ScoreboardProps>
) {
  const { title, defaultSort = "latest" } = props;

  // Fetch participants
  const participants: Participant[] =
    await client.fetch<Participant[]>(PARTICIPANTS_QUERY);

  return (
    <div className="w-full">
      {/* Client component for participant list with sorting and add functionality */}
      <ScoreboardClient
        participants={participants}
        initialSort={defaultSort}
        title={title}
      />
    </div>
  );
}
