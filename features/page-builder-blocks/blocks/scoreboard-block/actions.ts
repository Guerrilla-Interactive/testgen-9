"use server";

import { revalidatePath } from "next/cache";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

interface AddParticipantArgs {
  name: string;
  score: number;
}

interface EditParticipantArgs {
  id: string;
  name: string;
  score: number;
}

interface DeleteParticipantArgs {
  id: string;
}

export async function addParticipantAction(
  args: AddParticipantArgs,
): Promise<{ success?: boolean; error?: string }> {
  const { name, score } = args;

  if (!name || typeof score !== 'number' || score < 0) {
    return { error: "Invalid input data." };
  }

  try {
    // Create a token-authenticated client for mutations
    const tokenClient = client.withConfig({
      token: token || process.env.SANITY_API_TOKEN,
    });

    // Use the authenticated client to create a new document
    await tokenClient.create({
      _type: "participant", // Make sure this matches your schema name
      name: name,
      score: score,
      // The token is now set at the client level - don't include it in the document itself
      // Sanity automatically adds _id, _createdAt, _updatedAt
    });

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/"); // Adjust this path as needed

    return { success: true };

  } catch (error) {
    console.error("Failed to create participant:", error);
    
    // Improved error reporting
    const errorMessage = error instanceof Error 
      ? (error.message.includes("permission") 
          ? "Insufficient permissions. Please contact an administrator." 
          : error.message)
      : "Failed to add participant. Please try again.";
    
    return { error: errorMessage };
  }
}

export async function editParticipantAction(
  args: EditParticipantArgs,
): Promise<{ success?: boolean; error?: string }> {
  const { id, name, score } = args;

  if (!id || !name || typeof score !== 'number' || score < 0) {
    return { error: "Invalid input data." };
  }

  try {
    // Create a token-authenticated client for mutations
    const tokenClient = client.withConfig({
      token: token || process.env.SANITY_API_TOKEN,
    });

    // Use the authenticated client to update the document
    await tokenClient.patch(id)
      .set({
        name: name,
        score: score,
      })
      .commit();

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/");

    return { success: true };

  } catch (error) {
    console.error("Failed to update participant:", error);
    
    // Improved error reporting
    const errorMessage = error instanceof Error 
      ? (error.message.includes("permission") 
          ? "Insufficient permissions. Please contact an administrator." 
          : error.message)
      : "Failed to update participant. Please try again.";
    
    return { error: errorMessage };
  }
}

export async function deleteParticipantAction(
  args: DeleteParticipantArgs,
): Promise<{ success?: boolean; error?: string }> {
  const { id } = args;

  if (!id) {
    return { error: "Invalid input data." };
  }

  try {
    // Create a token-authenticated client for mutations
    const tokenClient = client.withConfig({
      token: token || process.env.SANITY_API_TOKEN,
    });

    // Use the authenticated client to delete the document
    await tokenClient.delete(id);

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/");

    return { success: true };

  } catch (error) {
    console.error("Failed to delete participant:", error);
    
    // Improved error reporting
    const errorMessage = error instanceof Error 
      ? (error.message.includes("permission") 
          ? "Insufficient permissions. Please contact an administrator." 
          : error.message)
      : "Failed to delete participant. Please try again.";
    
    return { error: errorMessage };
  }
} 