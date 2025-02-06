import blockContent from "./block-content.schema";
import link from "./link.schema";
import colorVariant from "./color-variant.schema";;
import sectionPadding from "./section-padding.schema";

const sharedSchemas = {
  blockContent,
  link,
  colorVariant,
  sectionPadding,
};

const allSharedBlockRelatedSchemas = Object.values(sharedSchemas)
  .filter((schema) => schema !== undefined)
  .map((schema) => schema);


export default allSharedBlockRelatedSchemas;


