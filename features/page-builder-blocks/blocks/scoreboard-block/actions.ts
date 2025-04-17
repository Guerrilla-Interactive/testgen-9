"use server";

import { revalidatePath } from "next/cache";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

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
    // Create a new client with token for write operations
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token, // Use the imported token for authentication
      useCdn: false, // We need the most up-to-date data, so don't use the CDN
    });

    // Use the writeClient to create a new document
    await writeClient.create({
      _type: "participant", // Make sure this matches your schema name
      name: name,
      score: score,
      // Sanity automatically adds _id, _createdAt, _updatedAt
    });

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/"); // Adjust this path as needed

    return { success: true };

  } catch (error) {
    console.error("Failed to create participant:", error);
    // Return a generic error message for security
    return { error: "Failed to add participant. Please try again." };
  }
}

// Interface for edit participant arguments
interface EditParticipantArgs {
  id: string;
  name: string;
  score: number;
}

export async function editParticipantAction(
  args: EditParticipantArgs
): Promise<{ success?: boolean; error?: string }> {
  const { id, name, score } = args;

  if (!id || !name || typeof score !== 'number' || score < 0) {
    return { error: "Invalid input data." };
  }

  try {
    // Create a new client with token for write operations
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token, // Use the imported token for authentication
      useCdn: false, // We need the most up-to-date data, so don't use the CDN
    });

    // Use the writeClient to update the document
    await writeClient.patch(id).set({
      name: name,
      score: score,
    }).commit();

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/"); // Adjust this path as needed

    return { success: true };

  } catch (error) {
    console.error("Failed to update participant:", error);
    // Return a generic error message for security
    return { error: "Failed to update participant. Please try again." };
  }
}

// Interface for delete participant arguments
interface DeleteParticipantArgs {
  id: string;
}

export async function deleteParticipantAction(
  args: DeleteParticipantArgs
): Promise<{ success?: boolean; error?: string }> {
  const { id } = args;

  if (!id) {
    return { error: "Invalid participant ID." };
  }

  try {
    // Create a new client with token for write operations
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token, // Use the imported token for authentication
      useCdn: false, // We need the most up-to-date data, so don't use the CDN
    });

    // Use the writeClient to delete the document
    await writeClient.delete(id);

    // Revalidate the path where the scoreboard is displayed
    revalidatePath("/"); // Adjust this path as needed

    return { success: true };

  } catch (error) {
    console.error("Failed to delete participant:", error);
    // Return a generic error message for security
    return { error: "Failed to delete participant. Please try again." };
  }
} 