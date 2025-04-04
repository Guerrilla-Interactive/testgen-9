"use client";

import { Container, FlexCol, FlexRow, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero5BlockComponent } from "@/features/page-builder-blocks/blocks/hero-5-block";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { GET_SERVICE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";
import { CustomContactFormBlockComponent } from "@/features/page-builder-blocks/blocks/custom-contact-form-block";
import FaqsBlockComponent from "@/features/page-builder-blocks/blocks/faqs-block/faqs.block-component";

export default function ServiceSlugPageComponent(page: Partial<GET_SERVICE_PAGE_BY_ROUTE_QUERYResult>) {
  const { sessionStatus } = useGlobalContext();
  const { setIsTopDark } = sessionStatus;

  useEffect(() => {
    setIsTopDark(false);
  }, []);

  return (
    <>
      <Hero5BlockComponent image={page.featuredImage} />

      <Section className="mb-12 mt-12">
        <Container>
          <FlexRow className="justify-between">
            {/* LEFT COLUMN */}
            <FlexCol
              className="
                w-full max-w-lg
              "
            >
              <div className="max-w-xl">
                {/* Title with 150ms delay */}
                <h1
                  className="
                    opacity-0
                    text-3xl md:text-4xl font-bold mb-4
                    animate-[fade-in-left-blur_1s_ease-out_0.2s_forwards]
                  "
                >
                  {page.customTitle || page.title}
                </h1>

                {/* Body text with 300ms delay */}
                <div
                  className=" opacity-0 animate-[fade-in-left-blur_1s_ease-out_0.5s_forwards]"
                >
                  <PortableTextRenderer value={page.body} />
                </div>
              </div>
            </FlexCol>

            {/* RIGHT COLUMN - 500ms delay */}
            <FlexCol
              className="
              opacity-0
                max-w-sm w-full border border-gray-200 rounded-lg p-6 mt-6 md:mt-0
                animate-[fade-in-right-blur_1s_ease-out_0.8s_forwards]
              "
            >
              <CustomContactFormBlockComponent {...page.customContactForm} />
            </FlexCol>
          </FlexRow>
        </Container>
      </Section>

      {page.faqs && (

            <FaqsBlockComponent {...page.faqs} />

      )}
    </>
  );
}
