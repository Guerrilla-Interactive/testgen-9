import { groq } from "next-sanity";

// @sanity-typegen-ignore
const metadataImageInnerQuery = groq`
  "id": asset._ref,
  altText
`;

// @sanity-typegen-ignore
export const metadataQuery = groq`
  "metadata": {
    "_ts": "MetadataQuery",
    "title": coalesce(metadata.title, title, name),
    "desc": coalesce(metadata.desc, excerpt),
    "image": select(
      defined(metadata.image.asset._ref) => metadata.image {
        ${metadataImageInnerQuery}
      },
      defined(image.asset._ref) => image {
        ${metadataImageInnerQuery}
      },
      defined(coverImage.asset._ref) => coverImage {
        ${metadataImageInnerQuery}
      },
      defined(hero.image.asset._ref) => hero.image {
        ${metadataImageInnerQuery}
      }
    ),
    "tags": metadata.tags,
    "noIndex": metadata.noIndex
  }
`;
