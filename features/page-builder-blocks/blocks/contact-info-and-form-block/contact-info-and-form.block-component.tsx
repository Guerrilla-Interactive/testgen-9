"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useCallback } from "react";
import { Loader2 } from "lucide-react";
import SectionContainer from "@/features/unorganized-components/ui/section-container";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/features/unorganized-components/ui/form";
import { Input } from "@/features/unorganized-components/ui/input";
import { Button } from "@/features/unorganized-components/ui/button";
import { stegaClean } from "next-sanity";
import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
// Import stegaClean from your utilities (assumes this exists)


interface ContactInfoAndFormProps {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  // Contact Info fields
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  // Form fields
  formHeading: string;
  buttonText: string;
  successMessage: string;
}

export default function ContactInfoAndFormBlockComponent({
  padding,
  colorVariant,
  contactHeading,
  contactDescription,
  contactEmail,
  contactPhone,
  contactAddress,
  formHeading,
  buttonText,
  successMessage,
}: Partial<ContactInfoAndFormProps>) {
  // Set default values if fields are undefined
  contactHeading = contactHeading || "Get in Touch";
  contactDescription =
    contactDescription ||
    "We would love to hear from you. Please reach out with any questions or inquiries.";
  contactEmail = contactEmail || "email@example.com";
  contactPhone = contactPhone || "123-456-7890";
  contactAddress = contactAddress || "123 Main Street, City, Country";
  formHeading = formHeading || "Send us a message";
  buttonText = buttonText || "Submit";
  successMessage = successMessage || "Thank you for contacting us!";

  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name." }),
    email: z
      .string()
      .min(1, { message: "Please enter your email." })
      .email({ message: "Please enter a valid email address." }),
    message: z.string().min(1, { message: "Please enter your message." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error || "An error occurred.");
        }
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form, successMessage]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSend(values);
  }

  const color = stegaClean(colorVariant) || colorVariant;

  return (
    <Section className="pt-24">
      <Container>
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Contact Info */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-sans text-balance">{contactHeading}</h2>
          <p className="text-lg text-gray-600">{contactDescription}</p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-primary hover:underline"
              >
                {contactEmail}
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${contactPhone}`}
                className="text-primary  hover:underline"
              >
                {contactPhone}
              </a>
            </p>
            <p>
              <strong>Address:</strong> <span>{contactAddress}</span>
            </p>
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 font-sans">{formHeading}</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Your Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your Email"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Your Message"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting && (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  )}
                  {buttonText}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      </Container>
      </Section>
    
  );
}
