"use client"

import { Container, FlexCol, FlexRow, Grid, GridCol, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero1BlockComponent } from "@/features/page-builder-blocks/blocks/hero-1-block";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { GET_COURSE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect, useState } from "react";
import { CustomContactFormBlockComponent } from "@/features/page-builder-blocks/blocks/custom-contact-form-block";
import { Icon } from "@iconify/react";

// Import Material Icons (using a common approach)
import dynamic from "next/dynamic";
import { Hero5BlockComponent } from "@/features/page-builder-blocks/blocks/hero-5-block";
import { cn } from "@/features/unorganized-utils/utils";

// Dynamically import Material icons
const MaterialIcon = dynamic(() => import("@mui/material/Icon"), { ssr: false });

export default function CourseSlugPageComponent(page: Partial<GET_COURSE_PAGE_BY_ROUTE_QUERYResult>) {
  const { sessionStatus } = useGlobalContext();
  const { setIsTopDark, isTopDark } = sessionStatus;
  const [iconLoaded, setIconLoaded] = useState(false);

  useEffect(() => {
    setIsTopDark(false);
  }, []);

  return (
    <>
    <Hero5BlockComponent image={page.featuredImage}  />

      <Section className="mb-12 mt-12">
        <Container>
          <FlexRow className="gap-24">
            <FlexCol className="w-full max-w-lg">
              <h1 className="
              opacity-0
               text-3xl md:text-4xl font-bold mb-4
               animate-[fade-in-left-blur_1s_ease-out_0.2s_forwards]">
                {page.title}
              </h1>

              {/* About the Course Section */}
              {page.aboutCourse && (
                <div className="mb-8 opacity-0 animate-[fade-in-left-blur_1s_ease-out_0.5s_forwards]">
                  <PortableTextRenderer value={page.aboutCourse} />
                </div>
              )}

            </FlexCol>
            <FlexCol className="w-full">
              
      {page.keyConcepts && page.keyConcepts.length > 0 && (
        <>
            {/* stagger delay animation per item */}
            <Grid className=" grid-cols-2 gap-8">
              {page.keyConcepts.map((concept, index) => (
                
                <GridCol key={index} className={cn("flex gap-4 items-start opacity-0", 
                  iconLoaded ? `animate-[fade-in-left-blur_1s_ease-out_forwards]` : ""
                )} style={{
                  animationDelay: `${index * 0.2}s`
                }}>
                  <Icon
                    icon={concept.icon.name}
                    width="48"
                    height="48"
                    onLoad={() => setIconLoaded(true)}
                  />
                  <div>
                    <h3 className="font-medium text-lg">{concept.title}</h3>
                    <p className="text-gray-600">{concept.description}</p>
                  </div>
                </GridCol>
                
              ))}
            </Grid>
        </>
      )}
              
            </FlexCol>
          </FlexRow>
        </Container>
      </Section>

      <Section>
        <Container>
            <FlexCol className="opacity-0 max-w-sm w-full border border-gray-200 rounded-lg p-6 animate-[fade-in-right-blur_1s_ease-out_1s_forwards]">
            <CustomContactFormBlockComponent {...page.customContactForm} />
          </FlexCol>
        </Container>
      </Section>












    </>
  )
}

