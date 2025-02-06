
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/ui/accordion";
import SectionContainer from "@/features/ui/section-container";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { stegaClean } from "next-sanity";


interface FAQProps {
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
  title: string;
  faqs: {
    _id: string;
    title: string;
    body: any;
  }[];
}

export default function FAQsBlockComponent({
  padding,
  colorVariant,
  faqs,
}: Partial<FAQProps>) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      {faqs && faqs.length > 0 && (
        <Accordion className="space-y-4" type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.title} value={`item-${faq._id}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={faq.body} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </SectionContainer>
  );
} 