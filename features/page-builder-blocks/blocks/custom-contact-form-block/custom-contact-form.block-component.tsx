"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  fieldType: "text" | "email" | "tel" | "textarea" | "checkbox" | "select" | "date" | "radio" | "file" | "heading";
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  isRequired: boolean;
  width?: "full" | "half";
  helpText?: string;
  options?: { label: string; value: string }[];
  labelOnly?: boolean;
  preChecked?: boolean;
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
    } else {
      acc[field.fieldName] = "";
    }
    return acc;
  }, {} as Record<string, any>);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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
    // Handle section headings separately
    if (field.fieldType === "heading") {
      return (
        <div key={field.fieldLabel} className="mt-8 mb-4">
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
          // Compute the placeholder: if labelOnly is true, use field.fieldLabel (or custom placeholder if provided)
          const computedPlaceholder = field.labelOnly
            ? (field.placeholder || field.fieldLabel)
            : field.placeholder;

          return (
            <FormItem className={cn("mb-6", field.width === "half" ? "w-1/2 pr-2" : "w-full")}>
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
                      className="pr-10"
                    />
                    <Calendar className="absolute top-3 right-3 h-4 w-4 text-gray-400" />
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
