import { groq } from "next-sanity";

const allPostsQuery = groq`
  _type == "all-posts" => {
    _type,
    padding,
    colorVariant,
  },
`; 

export default allPostsQuery;