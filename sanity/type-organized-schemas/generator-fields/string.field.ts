import type { StringDefinition } from "sanity";
import { defineField } from "sanity";

import type { FieldDef } from "@/sanity/type-organized-schemas/generator-fields/types/field.types";

export const stringField = (props: FieldDef<StringDefinition>) => {
  const { options, required, validation } = props;

  return defineField({
    ...props,
    type: "string",
    options: {
      ...options,
    },
    validation: validation
      ? validation
      : (Rule) => {
          const rules = [];
          if (required) rules.push(Rule.required().error());
          return rules;
        },
  });
};
