import { pageBuilderQuery } from "@/features/page-builder-blocks/block-indexer";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const headerSettingsQuery = groq`
    email,
    phoneNumber,
    logo,
    navigationItems[]->
`;





