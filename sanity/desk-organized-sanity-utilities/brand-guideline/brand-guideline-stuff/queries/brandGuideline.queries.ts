import { groq } from "next-sanity";

// Get all brand guidelines with basic info
export const BRAND_GUIDELINES_QUERY = groq`*[
  _type == "brandGuideline"
] | order(orderRank) {
  _id,
  _type,
  companyName,
  logo,
  "subPagesCount": count(subPage)
}`;

// Get a single brand guideline by ID
export const BRAND_GUIDELINE_BY_ID_QUERY = groq`*[
  _type == "brandGuideline" &&
  _id == $guidelineId
][0]{
  _id,
  _type,
  companyName,
  logo,
  subPage[]->{
    _id,
    _type,
    title,
    slug,
    "contentTypes": content[]._type
  }
}`;

// Get a single brand guideline by company name slug
export const BRAND_GUIDELINE_BY_COMPANY_QUERY = groq`*[
  _type == "brandGuideline" &&
  companyName == $companyName
][0]{
  _id,
  _type,
  companyName,
  logo,
  subPage[]->{
    _id,
    _type,
    title,
    slug
  }
}`;

// Get subpage content with expanded references
export const SUBPAGE_CONTENT_QUERY = groq`*[
  _type == "subPage" &&
  _id == $subPageId
][0]{
  _id,
  _type,
  title,
  slug,
  content[] {
    _type,
    _key,
    ...,
  }
}`; 