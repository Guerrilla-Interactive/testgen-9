import { defineField, defineType } from "sanity";
import { 
  Mail, 
  Type, 
  AtSign, 
  Phone, 
  AlignLeft, 
  CheckSquare, 
  List, 
  Calendar, 
  Radio, 
  Upload, 
  Heading 
} from "lucide-react";
import { customContactFormBlockTranslations as t } from "./custom-contact-form.block-translation";

// Field type icon mapping
const fieldTypeIcons = {
  text: Type,
  email: AtSign,
  tel: Phone,
  textarea: AlignLeft,
  checkbox: CheckSquare,
  select: List,
  date: Calendar,
  radio: Radio,
  file: Upload,
  heading: Heading,
} as const;

// Define a type based on the keys of fieldTypeIcons
type FieldType = keyof typeof fieldTypeIcons;

export default defineType({
  name: "custom-contact-form-block",
  type: "object",
  title: "Custom Contact Form",
  description: "A customizable contact form with dynamic fields",
  icon: Mail,
  fields: [
    // Form settings
    defineField({
      name: "formTitle",
      type: "string",
      title: "Form Title",
      description: "Title displayed above the form",
      initialValue: t("getHelp", "Get Help"),
    }),
    defineField({
      name: "formDescription",
      type: "text",
      title: "Form Description",
      description: "Description displayed above the form fields",
      initialValue: t("formDescription", "Contact us for inquiries and a non-binding offer regarding your project."),
    }),
    defineField({
      name: "submitButtonText",
      type: "string",
      title: "Submit Button Text",
      initialValue: t("submitButtonText", "Send Message"),
    }),
    defineField({
      name: "successMessage",
      type: "text",
      title: "Success Message",
      description: "Message displayed after successful form submission",
      initialValue: t("successMessage", "Thank you for your message. We will contact you as soon as possible!"),
    }),
    // Dynamic form fields
    defineField({
      name: "formFields",
      type: "array",
      title: "Form Fields",
      description: "Add and configure form fields",
      of: [
        {
          type: "object",
          name: "formField",
          title: "Form Field",
          fields: [
            defineField({
              name: "fieldType",
              type: "string",
              title: "Field Type",
              options: {
                list: [
                  { title: "Text Input", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "tel" },
                  { title: "Textarea", value: "textarea" },
                  { title: "Checkbox", value: "checkbox" },
                  { title: "Select", value: "select" },
                  { title: "Date", value: "date" },
                  { title: "Radio Group", value: "radio" },
                  { title: "File Upload", value: "file" },
                  { title: "Section Heading", value: "heading" },
                ],
              },
            }),
            defineField({
              name: "fieldName",
              type: "string",
              title: "Field Name",
              description: "The identifier for this field (no spaces)",
              validation: (Rule) => Rule.required().regex(/^[a-zA-Z0-9_]+$/).error(
                "Field name can only contain letters, numbers, and underscores"
              ),
              hidden: ({ parent }) => parent?.fieldType === "heading",
            }),
            defineField({
              name: "fieldLabel",
              type: "string",
              title: "Field Label",
              description: "The label shown to users",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              type: "string",
              title: "Placeholder",
              description: "Placeholder text for the field",
              hidden: ({ parent }) => ["heading", "checkbox", "radio", "file"].includes(parent?.fieldType),
            }),
            defineField({
              name: "isRequired",
              type: "boolean",
              title: "Required",
              description: "Is this field required?",
              initialValue: false,
              hidden: ({ parent }) => parent?.fieldType === "heading",
            }),
            defineField({
              name: "width",
              type: "string",
              title: "Field Width",
              description: "Width of the field in the form layout",
              options: {
                list: [
                  { title: "Full Width", value: "full" },
                  { title: "Half Width", value: "half" },
                ],
              },
              initialValue: "full",
              hidden: ({ parent }) => parent?.fieldType === "heading",
            }),
            defineField({
              name: "options",
              type: "array",
              title: "Options",
              description: "Options for select, radio, or checkbox fields",
              hidden: ({ parent }) => 
                !["select", "radio"].includes(parent?.fieldType),
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      title: "Label",
                    }),
                    defineField({
                      name: "value",
                      type: "string",
                      title: "Value",
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: "helpText",
              type: "string",
              title: "Help Text",
              description: "Additional information displayed below the field",
            }),
            defineField({
              name: "labelOnly",
              type: "boolean",
              title: "Label Only",
              description: "If enabled, display only the label (as placeholder) without a separate title above the field.",
              initialValue: false,
            }),
            defineField({
              name: "preChecked",
              type: "boolean",
              title: "Prechecked",
              description: "If enabled, the checkbox will be prechecked",
              initialValue: false,
              hidden: ({ parent }) => parent?.fieldType !== "checkbox",
            }),
          ],
          preview: {
            select: {
              title: "fieldLabel",
              fieldType: "fieldType",
              required: "isRequired",
              width: "width",
              placeholder: "placeholder",
            },
            prepare({ title, fieldType, required, width, placeholder }) {
              const icon = fieldTypeIcons[fieldType as FieldType] || Mail;
              
              // Create a more descriptive subtitle with just values
              let details = [];
              if (placeholder) details.push(placeholder);
              if (width) details.push(width);
              if (required) details.push("Required");
              
              const subtitle = details.join(' | ');
              
              return {
                title: title || "Unnamed Field",
                subtitle: subtitle,
                media: icon,
              };
            },
          },
        },
      ],
      initialValue: () => [
        createFormField("formField", "text", "navn", t("name", "Name"), t("namePlaceholder", "Your name..."), true, "full"),
        createFormField("formField", "tel", "telefonnummer", t("phone", "Phone"), t("phonePlaceholder", "Your phone number..."), true, "full"),
        createFormField("formField", "email", "epost", t("email", "Email"), t("emailPlaceholder", "Your email address"), true, "full"),
        createFormField("formField", "textarea", "melding", t("message", "Message"), t("messagePlaceholder", "Your message..."), false, "full", 
          t("messageHelpText", "It's helpful with a brief description of what you need help with, so we can be more helpful when we contact you!"))
      ]
    }),
  ],
  preview: {
    select: {
      title: "formTitle",
    },
    prepare({ title }) {
      return {
        title: title || "Custom Contact Form",
        subtitle: "Dynamic form fields",
        media: Mail,
      };
    },
  },
});

function createFormField(
  _type: "formField",
  fieldType: string, 
  fieldName: string, 
  fieldLabel: string, 
  placeholder: string, 
  isRequired: boolean, 
  width: "full" | "half",
  helpText?: string,
  preChecked?: boolean
) {
  return {
    _type: "formField",
    fieldType,
    fieldName,
    fieldLabel,
    placeholder,
    isRequired,
    width,
    ...(helpText && { helpText }),
    preChecked: preChecked ?? false,
  };
}
