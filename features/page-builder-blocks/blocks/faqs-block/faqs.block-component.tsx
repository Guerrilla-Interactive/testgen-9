import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/unorganized-components/ui/accordion";
import SectionContainer from "@/features/unorganized-components/ui/section-container";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { stegaClean } from "next-sanity";
import { FaqsBlock } from "@/sanity.types";
import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";

export default function FAQsBlockComponent(props: Partial<FaqsBlock>) {
  const { faqs, faqsByCategory } = props;
  
  return (
    <Section>


      <Container>
        {(faqs || faqsByCategory) && (
          <Accordion className="space-y-4" type="multiple">
            {faqs && faqs.map((faq) => (
              <AccordionItem key={faq._id} value={`item-${faq._id}`}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>
                  <PortableTextRenderer value={faq.body} />
                </AccordionContent>
              </AccordionItem>
            ))}
            {/* Find the faqsByCategory and map over the faqs - only show the faq items that are in the faqsByCategory */}
            {faqsByCategory && faqsByCategory.map((faqCategory) => 
               faqCategory.faqs.map((faq) => (
          
                  <AccordionItem key={faq._id + 2} value={`item-${faq._id + 2}`}>
                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                    <AccordionContent>
                      <PortableTextRenderer value={faq.body} />
                    </AccordionContent>
                  </AccordionItem>
                ))
            )}
          </Accordion>
        )}


          
 

      
     
    
      </Container>
    </Section>
  );
} 