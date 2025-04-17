import { groq } from "next-sanity";

// Removed getAuthorReferenceQuery

// Added a basic query to fetch all participants
export const PARTICIPANTS_QUERY = groq`
  *[_type == "participant"] | order(createdAt desc) {
    _id,
    _createdAt,
    name,
    score,
    createdAt // Include the custom createdAt field if needed
  }
`;
