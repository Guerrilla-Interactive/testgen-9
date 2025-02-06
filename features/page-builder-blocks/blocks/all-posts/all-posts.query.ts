import { groq } from "next-sanity";

const allPostsBlockQuery = groq`
  _type == "all-posts-block" => {
    _type,
    padding,
    colorVariant,
  },
`; 

export default allPostsBlockQuery;