"use client"

import { Container, FlexCol, FlexRow, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero5BlockComponent } from "@/features/page-builder-blocks/blocks/hero-5-block";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { GET_SERVICE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";
import { CustomContactFormBlockComponent } from "@/features/page-builder-blocks/blocks/custom-contact-form-block";



export default function ServiceSlugPageComponent(page: Partial<GET_SERVICE_PAGE_BY_ROUTE_QUERYResult>){
    
    const { sessionStatus } = useGlobalContext();
    const { setIsTopDark, isTopDark } = sessionStatus;

    useEffect(() => {
        setIsTopDark(false);
    }, []);
    
    return (
        <>
    <Hero5BlockComponent 
      image={page.featuredImage}
      
    />
    <Section className="mb-12 mt-12">
      <Container>
        <FlexRow className="justify-between">
          <FlexCol className="w-full max-w-lg ">
          <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {page.customTitle || page.title}
            </h1>
            <PortableTextRenderer value={page.body} />
          </div>
          </FlexCol>
          <FlexCol className="max-w-sm w-full border border-gray-200 rounded-lg p-6  ">
            <CustomContactFormBlockComponent  {...page.customContactForm} />
          </FlexCol>
        </FlexRow>
      </Container>
    </Section>
        </>

    )
}

