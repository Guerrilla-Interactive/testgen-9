import { groq } from "next-sanity";

const scoreboardBlockQuery = groq`
  _type == "scoreboard-block" => {
    _type,
  }
`;

export default scoreboardBlockQuery;
