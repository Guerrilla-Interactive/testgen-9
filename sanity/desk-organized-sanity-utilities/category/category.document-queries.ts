import { groq } from "next-sanity";

export const getAllCategoriesQuery = groq`
categories[]->{
        title,
      },
`;
