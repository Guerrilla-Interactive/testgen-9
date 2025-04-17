import { User } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// Renamed function and updated properties
export const participantDeskStructure = (S: StructureBuilder, context: any) => {
  // Using standard documentList instead of orderable one
  return S.listItem()
    .title("Participants") // Changed title
    .icon(User) // Keep User icon for now
    .schemaType("participant") // Changed type
    .child(
      S.documentTypeList("participant") // Changed type
        .title("Participants") // Changed title
        .defaultOrdering([{ field: "createdAt", direction: "desc" }]) // Order by creation date
    );
}; 