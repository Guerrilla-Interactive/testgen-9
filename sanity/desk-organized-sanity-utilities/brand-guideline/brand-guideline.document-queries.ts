import { groq } from "next-sanity";

// Get all brand guidelines
export const getAllBrandGuidelinesQuery = groq`*[
  _type == "brandGuideline"
] | order(orderRank) {
  _id,
  _type,
  companyName,
  logo,
  subPage[]->{
    _id,
    title,
    slug
  }
}`;

// Get a single brand guideline by ID
export const getBrandGuidelineByIdQuery = groq`*[
  _type == "brandGuideline" && 
  _id == $guidelineId
][0]{
  _id,
  _type,
  companyName,
  logo,
  subPage[]->{
    _id,
    title,
    slug
  }
}`;

// Get a subpage with content
export const getSubPageWithContentQuery = groq`*[
  _type == "subPage" && 
  _id == $subPageId
][0]{
  _id,
  title,
  slug,
  content[]{ 
    _type,
    _key,
    ...,
  }
}`;
