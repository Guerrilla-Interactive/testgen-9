import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const imageInnerQuery = groq`
  crop,
  hotspot,
  "darkScore": (
    (coalesce(asset->metadata.palette.darkVibrant.population, 0)
     + coalesce(asset->metadata.palette.darkMuted.population, 0))
    /
    (
      coalesce(asset->metadata.palette.darkVibrant.population, 0)
      + coalesce(asset->metadata.palette.darkMuted.population, 0)
      + coalesce(asset->metadata.palette.dominant.population, 0)
      + coalesce(asset->metadata.palette.lightVibrant.population, 0)
      + coalesce(asset->metadata.palette.lightMuted.population, 0)
      + coalesce(asset->metadata.palette.muted.population, 0)
    )
  ),
  asset->{
    _id,
    title,
    altText,
    description,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        width,
        height
      },
      palette {
        dominant {
          background,
          foreground,
          population
        }
      }
    }
  }
`;

// @sanity-typegen-ignore
export const imageQuery = groq`
  ${imageInnerQuery}
`;
