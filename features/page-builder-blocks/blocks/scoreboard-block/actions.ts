"use server";

import { revalidatePath } from "next/cache";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

interface AddParticipantArgs {
  name: string;
  score: number;
}

export async function addParticipantAction(
  args: AddParticipantArgs,
): Promise<{ success?: boolean; error?: string }> {
  const { name, score } = args;

  if (!name || typeof score !== 'number' || score < 0) {
    return { error: "Invalid input data." };
  }

  try {
    // Use the Sanity client to create a new document
    await client.create({
      _type: "participant", // Make sure this matches your schema name
      name: name,
      score: score,
      token:  "sk06vVSaC9Y63epyc9mQ1Olz6uDxKeRE2phQNOehwwA8zcsbMEJtUuMOiG1Ac0dbFKATxs3j5lLU8H9P4Sg8tL4GUMOpJ2NRd4ymEgArFHrGYL7bkgmEEE7LqwcgF78W6rBlr9uRvfnVY3PF0ujE5NOSkfzSzJqYHgBZbTT9LTd7KezQz6L2",

      // Sanity automatically adds _id, _createdAt, _updatedAt
      // The 'createdAt' field in your schema with initialValue will also be set
    });

    // Revalidate the path where the scoreboard is displayed
    // Replace '/' with the actual path if it's different
    // Or use revalidateTag if you have tagged fetches
    revalidatePath("/"); // Adjust this path as needed

    return { success: true };

  } catch (error) {
    console.error("Failed to create participant:", error);
    // Return a generic error message for security
    return { error: "Failed to add participant. Please try again." };
  }
} 