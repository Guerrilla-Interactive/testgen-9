"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Course } from "../course-slider.block-query";
import Link from "next/link";


interface CourseCardProps {
  course: Course;
  index: number;
  isRecalcDone: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, isRecalcDone }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const shouldAnimate = isRecalcDone && isVisible;

  return (
    <Link className="group" href={`/courses/${course.slug}`}>
        <div
          ref={cardRef}
          className={`w-96 flex-shrink-0 border opacity-0 cursor-pointer ${shouldAnimate && "animate-fade-up"}`}
          style={shouldAnimate ? { animationDelay: `${index * 150}ms` } : {}}
        >
          <div className="relative h-72 w-full overflow-hidden">
            {course.image ? (
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300">
                <span className="text-gray-600">No Image</span>
              </div>
            )}
          </div>
          <div className="mt-4 p-8">
            <h3 className="text-xl font-sans font-semibold">{course.title}</h3>
            <p className="mt-2 text-gray-600">{course.excerpt}</p>
            <span className="mt-4 inline-block border group-hover:border-primary group-active:scale-95 transition-all duration-100 text-dark py-2 px-4 rounded">
              Les mer
            </span>
          </div>
        </div>
    </Link>
  );
};

export default CourseCard;
