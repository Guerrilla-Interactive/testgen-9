import type { ArrayDefinition, ReferenceDefinition } from "sanity";
import { defineArrayMember, defineField } from "sanity";
import { FieldDef } from "./types/field.types";


type Multiple = Omit<FieldDef<ArrayDefinition>, "of"> & {
  allowMultiple: true;
  itemTitle?: string;
  min?: number;
  max?: number;
  to: ReferenceDefinition["to"];
  disableNew?: boolean;
  filter?: string;
  required?: boolean;
};

type Single = FieldDef<ReferenceDefinition> & {
  allowMultiple?: never;
  itemTitle?: never;
  min?: never;
  max?: never;
  disableNew?: boolean;
  filter?: string;
  required?: boolean;
};

type MultipleOrSingle<AllowMultiple = boolean> = AllowMultiple extends true ? Multiple : Single;

export const referenceField = (
  props: MultipleOrSingle & { required?: boolean; group?: string },
) => {
  if (props?.allowMultiple) {
    return multipleReferenceField(props);
  }

  return singleReferenceField(props);
};

const singleReferenceField = (props: Single) => {
  const { filter, ...propsWithoutFilter } = props;
  const { options, disableNew, required, validation } = propsWithoutFilter;

  return defineField({
    ...propsWithoutFilter,
    type: "reference",
    options: {
      ...options,
      disableNew: disableNew ?? false,
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

const multipleReferenceField = (props: Multiple) => {
  const {
    name,
    title,
    description,
    group,
    hidden,
    readOnly,
    options,
    min,
    max,
    validation,
    required,
    itemTitle,
    to,
    disableNew,
    filter,
  } = props;

  const arrayProps = {
    name,
    title,
    description,
    group,
    hidden,
    readOnly,
    options: { ...options, required },
  };

  const referenceProps: Omit<ReferenceDefinition, "name" | "type"> = {
    title: itemTitle ?? "Velg dokument",
    to: to,
    options: {
      disableNew,
    },
  };

  return defineField({
    ...arrayProps,
    type: "array",
    of: [
      defineArrayMember({
        ...referenceProps,
        type: "reference",
      }),
    ],
    validation: validation
      ? validation
      : (Rule) => {
          const rules = [Rule.unique().error()];
          if (required) rules.push(Rule.required().error());
          if (min) rules.push(Rule.min(min).error());
          if (max) rules.push(Rule.max(max).error());
          return rules;
        },
  });
};
