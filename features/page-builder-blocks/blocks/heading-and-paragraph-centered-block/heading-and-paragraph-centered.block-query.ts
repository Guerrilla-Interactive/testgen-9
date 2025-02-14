import { groq } from "next-sanity";

const headingAndParagraphCenteredBlockQuery = groq`
  _type == "heading-and-paragraph-centered-block" => {
    _type,
    heading,
    paragraph,
  },
`;

export default headingAndParagraphCenteredBlockQuery;
