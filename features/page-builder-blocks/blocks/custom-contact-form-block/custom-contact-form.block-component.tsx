"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Calendar, Upload, X } from "lucide-react";
import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/features/unorganized-components/ui/form";
import { Input } from "@/features/unorganized-components/ui/input";
import { Button } from "@/features/unorganized-components/ui/button";
import { Checkbox } from "@/features/unorganized-components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/unorganized-components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/features/unorganized-components/ui/radio-group";
import { cn } from "@/features/unorganized-utils/utils";

type FormFieldType = {
  fieldType: "text" | "email" | "tel" | "textarea" | "checkbox" | "select" | "date" | "radio" | "file" | "heading";
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  isRequired: boolean;
  width?: "full" | "half";
  helpText?: string;
  options?: { label: string; value: string }[];
};

interface CustomContactFormProps {
  formTitle?: string;
  formDescription?: string;
  submitButtonText?: string;
  successMessage?: string;
  formFields?: FormFieldType[];
}

export default function CustomContactFormBlockComponent({
  formTitle = "Kontakt oss",
  formDescription,
  submitButtonText = "Send melding",
  successMessage = "Takk for meldingen. Vi vil kontakte deg så fort som mulig!",
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
          validator = z.string().email({ message: "Vennligst skriv inn en gyldig e-postadresse" });
          break;
        case "tel":
          validator = z.string().min(5, { message: "Vennligst skriv inn et gyldig telefonnummer" });
          break;
        case "date":
          validator = z.string().refine((val) => {
            if (!val) return !field.isRequired;
            const date = new Date(val);
            return !isNaN(date.getTime());
          }, { message: "Vennligst velg en gyldig dato" });
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
              message: `${field.fieldLabel} må bekreftes`,
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
          validator = validator.min(1, { message: `Vennligst velg en ${field.fieldLabel}` });
        } else {
          validator = validator.min(1, { message: `${field.fieldLabel} er påkrevd` });
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
    acc[field.fieldName] = field.fieldType === "checkbox" ? false : "";
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
        toast.success(successMessage);
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
        toast.error(result.error || "En feil oppstod.");
      }
    } catch (error: any) {
      toast.error(error.message || "En feil oppstod under innsendingen av skjemaet.");
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
        <div key={field.fieldName} className={cn("mb-6", field.width === "half" ? "md:w-1/2 pr-2" : "w-full")}>
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
                    {field.placeholder || "Velg fil"}
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
        render={({ field: formField }) => (
          <FormItem className={cn("mb-6", field.width === "half" ? "md:w-1/2 md:pr-2" : "w-full")}>
            <FormLabel>{field.fieldLabel}{field.isRequired && " *"}</FormLabel>
            <FormControl>
              {field.fieldType === "textarea" ? (
                <textarea
                  {...formField}
                  placeholder={field.placeholder}
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
                  <label htmlFor={field.fieldName} className="text-sm">{field.placeholder || field.fieldLabel}</label>
                </div>
              ) : field.fieldType === "select" ? (
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
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
                    placeholder={field.placeholder}
                    className="pr-10"
                  />
                  <Calendar className="absolute top-3 right-3 h-4 w-4 text-gray-400" />
                </div>
              ) : (
                <Input
                  {...formField}
                  type={field.fieldType}
                  placeholder={field.placeholder}
                />
              )}
            </FormControl>
            {field.helpText && <FormDescription>{field.helpText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg p-6">
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
