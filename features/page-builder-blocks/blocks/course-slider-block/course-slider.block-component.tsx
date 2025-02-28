"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Container, Section, InnerSection } from "@/features/unorganized-components/nextgen-core-ui";
import { getContainerOffsetPlusPadding } from "@/features/unorganized-utils/get-container-offset-plus-padding.t";
import CourseCard from "./course-slider-block-components/course-card.component";
import type { CourseSliderProps } from "./course-slider.block-query";



const CourseSliderBlockComponent: React.FC<Partial<CourseSliderProps>> = (props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [isRecalcDone, setIsRecalcDone] = useState(false);

  useEffect(() => {
    /**
     * Recalculates the offset + padding on the container.
     */
    const recalcOffset = () => {
      if (!sliderRef.current) return;
      const offsetPlusPadding = getContainerOffsetPlusPadding(sliderRef.current);
      setSliderLeft(offsetPlusPadding);
      setIsRecalcDone(true);
    };

    // Run once on mount
    recalcOffset();

    // If ResizeObserver is available in the environment, observe the element
    let observer: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined" && sliderRef.current) {
      observer = new ResizeObserver(() => {
        // Each time the container is resized, recalculate
        recalcOffset();
      });
      observer.observe(sliderRef.current);
    }

    // Clean up on unmount
    return () => {
      if (observer && sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <Section className="scrollbar-hide">
      <Container>
        <h2 className="font-sans text-3xl">{props.title}</h2>
      </Container>

      <InnerSection className="py-8 overflow-x-auto scrollbar-hide">
        <div
          ref={sliderRef}
          style={{ paddingLeft: sliderLeft, paddingRight: sliderLeft }}
          className="flex gap-8 scrollbar-hide overflow-x-scroll"
        >
          {props.courses?.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              index={index}
              isRecalcDone={isRecalcDone}
            />
          ))}
        </div>
      </InnerSection>
    </Section>
  );
};

export default CourseSliderBlockComponent;
