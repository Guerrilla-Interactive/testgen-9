"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Calendar, Upload, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/features/unorganized-components/ui/form";
import { Input } from "@/features/unorganized-components/ui/input";
import { Button } from "@/features/unorganized-components/ui/button";
import { Checkbox } from "@/features/unorganized-components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/unorganized-components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/features/unorganized-components/ui/radio-group";
import { cn } from "@/features/unorganized-utils/utils";
import { customContactFormBlockTranslations as t } from "./custom-contact-form.block-translation";

type FormFieldType = {
  fieldType: "text" | "email" | "tel" | "textarea" | "checkbox" | "checkboxGroup" | "select" | "date" | "datetime" | "radio" | "file" | "heading";
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  isRequired: boolean;
  width?: "full" | "half" | "third" | "quarter" | "remaining";
  helpText?: string;
  options?: { label: string; value: string }[];
  labelOnly?: boolean;
  preChecked?: boolean;
  conditionalLogic?: {
    enabled?: boolean;
    controllerFieldName?: string;
    action?: "show" | "hide";
    controllerValueChecked?: "true" | "false"; // Matches schema string value
  };
};

interface CustomContactFormProps {
  formTitle?: string;
  formDescription?: string;
  submitButtonText?: string;
  successMessage?: string;
  formFields?: FormFieldType[];
}

export default function CustomContactFormBlockComponent({
  formTitle = t("formTitle", "Contact Us"),
  formDescription = t("formDescription", "Contact us for inquiries and a non-binding offer regarding your project."),
  submitButtonText = t("submitButtonText", "Send Message"),
  successMessage = t("successMessage", "Thank you for your message. We will contact you as soon as possible!"),
  formFields = [],
}: Partial<CustomContactFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Dynamically build the validation schema based on form fields
  const buildFormSchema = () => {
    const schemaMap: Record<string, any> = {};

    formFields?.forEach((field) => {
      // Skip heading fields as they don't need validation
      if (field.fieldType === "heading") return;

      let validator;

      switch (field.fieldType) {
        case "email":
          validator = z.string().email({ message: t("invalidEmail", "Please enter a valid email address") });
          break;
        case "tel":
          validator = z.string().min(5, { message: t("invalidPhone", "Please enter a valid phone number") });
          break;
        case "date":
          validator = z.string().refine((val) => {
            if (!val) return !field.isRequired;
            const date = new Date(val);
            return !isNaN(date.getTime());
          }, { message: t("invalidDate", "Please select a valid date") });
          break;
        case "datetime":
          validator = z.string().refine((val) => {
            if (!val) return !field.isRequired;
            // datetime-local input format is YYYY-MM-DDTHH:mm
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
            if (!dateTimeRegex.test(val)) return false;
            const date = new Date(val);
            return !isNaN(date.getTime());
          }, { message: t("invalidDateTime", "Please select a valid date and time") });
          break;
        case "file":
          // Files are handled separately, we just need a placeholder in the schema
          validator = z.any().optional();
          break;
        case "textarea":
        case "text":
          validator = z.string();
          break;
        case "checkbox":
          validator = z.boolean();
          if (field.isRequired) {
            validator = validator.refine((val) => val === true, {
              message: `${field.fieldLabel} ${t("mustBeConfirmed", "must be confirmed")}`,
            });
          }
          break;
        case "checkboxGroup":
          validator = z.array(z.string());
          if (field.isRequired) {
            validator = validator.min(1, {
              message: t("mustSelectOneOption", "You must select at least one option")
            });
          }
          break;
        case "radio":
        case "select":
          validator = z.string();
          break;
        default:
          validator = z.string();
      }

      if (field.isRequired && field.fieldType !== "checkbox" && field.fieldType !== "file") {
        if (field.fieldType === "radio" || field.fieldType === "select") {
          validator = validator.min(1, { message: `${t("pleasePick", "Please select a")} ${field.fieldLabel}` });
        } else {
          validator = validator.min(1, { message: `${field.fieldLabel} ${t("required", "is required")}` });
        }
      }

      // Add optional refinement for file type required field
      if (field.isRequired && field.fieldType === "file") {
        // Since files are handled outside RHF, we validate based on the state
        validator = validator.refine(() => !!files[field.fieldName], {
          message: `${field.fieldLabel} ${t("required", "is required")}`,
        });
      }

      schemaMap[field.fieldName] = validator;
    });

    return z.object(schemaMap);
  };

  const formSchema = buildFormSchema();

  // Create default values for the form
  const defaultValues = formFields?.reduce((acc, field) => {
    if (field.fieldType === "heading") return acc;
    if (field.fieldType === "checkbox") {
      acc[field.fieldName] = field.preChecked ? true : false;
    } else if (field.fieldType === "checkboxGroup") {
      acc[field.fieldName] = [];
    } else {
      acc[field.fieldName] = "";
    }
    return acc;
  }, {} as Record<string, any>);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch all form values for conditional logic
  const watchedValues = useWatch({ control: form.control });

  const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fieldName]: file }));
  };

  const removeFile = (fieldName: string) => {
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName]!.value = '';
    }
  };

  async function onSubmit(data: any) {
    setIsSubmitting(true);

    try {
      // Create a FormData object to handle both text fields and files
      const formData = new FormData();

      // Add all the form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Add any files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      // Submit to the API
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(t("successMessage", "Thank you for your message. We will contact you as soon as possible!"));
        form.reset();
        // Clear all files
        setFiles({});
        // Reset file inputs
        Object.keys(fileInputRefs.current).forEach(key => {
          if (fileInputRefs.current[key]) {
            fileInputRefs.current[key]!.value = '';
          }
        });
      } else {
        toast.error(result.error || t("errorMessage", "An error occurred."));
      }
    } catch (error: any) {
      toast.error(error.message || t("submissionError", "An error occurred while submitting the form."));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Render different field types based on configuration
  const renderFormField = (field: FormFieldType) => {
    // --- Start Conditional Logic Check ---
    if (field.conditionalLogic?.enabled && field.conditionalLogic.controllerFieldName) {
      const { controllerFieldName, action, controllerValueChecked } = field.conditionalLogic;
      const controllerValue = watchedValues[controllerFieldName]; // Get current value of controller field

      // Determine the expected state (boolean) based on the schema string ("true"/"false")
      const expectedCondition = controllerValueChecked === "true";

      // Check if the actual controller value matches the expected state
      // Assuming controller is a checkbox (boolean value)
      const conditionIsMet = !!controllerValue === expectedCondition;

      let shouldRender = true;
      if (action === 'show') {
        shouldRender = conditionIsMet;
      } else if (action === 'hide') {
        shouldRender = !conditionIsMet;
      }

      // If the field should not be rendered based on the condition, return null
      if (!shouldRender) {
        return null;
      }
    }
    // --- End Conditional Logic Check ---

    // Handle section headings separately
    if (field.fieldType === "heading") {
      return (
        <div key={field.fieldLabel} className="mt-8 mb-4 w-full">
          <h3 className="text-xl font-semibold">{field.fieldLabel}</h3>
          {field.helpText && <p className="text-sm text-gray-600 mt-1">{field.helpText}</p>}
        </div>
      );
    }

    // For file uploads, we need to manage them outside react-hook-form
    if (field.fieldType === "file") {
      return (
        <div key={field.fieldName} className={cn("mb-6", field.width === "half" ? "w-1/2 pr-2" : "w-full")}>
          <FormLabel>{field.fieldLabel}{field.isRequired && " *"}</FormLabel>
          <div className="mt-1">
            <div className="border border-gray-300 rounded-md p-3">
              {files[field.fieldName] ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm truncate">{files[field.fieldName]?.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(field.fieldName)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id={field.fieldName}
                    onChange={(e) => handleFileChange(field.fieldName, e)}
                    className="hidden"
                    ref={(el) => {
                      fileInputRefs.current[field.fieldName] = el;
                      return undefined;
                    }}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRefs.current[field.fieldName]?.click()}
                    className="w-full text-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {field.placeholder || t("selectFile", "Select file")}
                  </Button>
                </div>
              )}
            </div>
            {field.helpText && <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>}
          </div>
        </div>
      );
    }

    return (
      <FormField
        key={field.fieldName}
        control={form.control}
        name={field.fieldName}
        render={({ field: formField }) => {
          // Compute placeholder based on labelOnly and explicit placeholder presence
          let computedPlaceholder: string | undefined;
          if (field.labelOnly) {
            // If labelOnly, use placeholder if set, otherwise use label directly
            computedPlaceholder = field.placeholder || field.fieldLabel;
          } else {
            // If not labelOnly, use placeholder if set, otherwise use label + "..."
            computedPlaceholder = field.placeholder ? field.placeholder : `${field.fieldLabel}...`;
          }

          return (
            <FormItem className={cn(
              "mb-6", // Base margin
              // Mobile width: Full or Half
              (field.width === 'full' || !field.width) ? 'w-full' : 'w-1/2 pr-2',
              // Desktop width overrides
              field.width === 'half' && 'md:w-1/2 md:pr-2',
              field.width === 'third' && 'md:w-1/3 md:pr-2',
              field.width === 'quarter' && 'md:w-1/4 md:pr-2',
              field.width === 'remaining' && 'md:flex-1 md:pr-2',
            )}>
              {/* For non-checkbox fields, display the label above the input only if labelOnly is not enabled */}
              {field.fieldType !== "checkbox" && !field.labelOnly && (
                <FormLabel>
                  {field.fieldLabel}{field.isRequired && " *"}
                </FormLabel>
              )}
              <FormControl>
                {field.fieldType === "textarea" ? (
                  <textarea
                    {...formField}
                    placeholder={computedPlaceholder}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                ) : field.fieldType === "checkbox" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formField.value}
                      onCheckedChange={formField.onChange}
                      id={field.fieldName}
                    />
                    <label htmlFor={field.fieldName} className="text-sm">
                      {field.fieldLabel}
                    </label>
                  </div>
                ) : field.fieldType === "checkboxGroup" ? (
                  <div className="flex flex-col space-y-2">
                    {field.options?.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name={field.fieldName}
                        render={({ field: groupField }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={groupField.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? groupField.onChange([...(groupField.value || []), option.value])
                                    : groupField.onChange(
                                      (groupField.value || []).filter(
                                        (value: string) => value !== option.value
                                      )
                                    );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ) : field.fieldType === "select" ? (
                  <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={computedPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.fieldType === "radio" ? (
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex flex-col space-y-1"
                  >
                    {field.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${field.fieldName}-${option.value}`} />
                        <label htmlFor={`${field.fieldName}-${option.value}`} className="text-sm">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : field.fieldType === "date" ? (
                  <div className="relative">
                    <Input
                      {...formField}
                      type="date"
                      placeholder={computedPlaceholder}
                    />
                  </div>
                ) : field.fieldType === "datetime" ? (
                  <div className="relative">
                    <Input
                      {...formField}
                      type="datetime-local"
                      placeholder={computedPlaceholder}
                    />
                  </div>
                ) : (
                  <Input {...formField} type={field.fieldType} placeholder={computedPlaceholder} />
                )}
              </FormControl>
              {field.helpText && <FormDescription>{field.helpText}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  };

  return (
    <div className="mx-auto">
      {formTitle && (
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      )}
      {formDescription && (
        <p className="text-base mb-8 text-gray-600">{formDescription}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap">
            {formFields?.map(renderFormField)}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting && (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            )}
            {submitButtonText}
          </Button>
        </form>
      </Form>
    </div>
  );
}
