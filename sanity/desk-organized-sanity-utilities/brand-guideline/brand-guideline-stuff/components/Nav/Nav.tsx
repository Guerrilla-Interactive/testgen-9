"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Interface for SubPage
interface SubPage {
  _key?: string;
  title?: string;
  components?: any[];
}

// Interface for Nav props
interface NavProps {
  logo?: string;
  subPages?: SubPage[]; // Add subPages prop
}

const Nav: React.FC<NavProps> = ({ logo, subPages = [] }) => {
  const hasLogo = logo && logo.length > 0;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const scrollTimerRef = useRef<number | null>(null);
  const isManualNavRef = useRef<boolean>(false);

  // Helper to debounce scroll events
  const debounce = (func: Function, delay: number) => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(func, delay);
  };

  // Track active section based on scroll position and URL hash
  useEffect(() => {
    if (!subPages?.length) return;

    // Update active section based on scroll position
    const handleScroll = () => {
      // Skip scroll detection if the user just clicked a navigation link
      if (isManualNavRef.current) {
        return;
      }

      debounce(() => {
        const scrollPosition = window.scrollY + 150; // Offset for better trigger point

        // Get all section elements
        const sections = subPages.map(subPage => 
          document.getElementById(`section-${subPage._key || subPage.title?.replace(/\s+/g, '-').toLowerCase()}`)
        ).filter(Boolean);

        // Find the current active section
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (!section) continue;
          
          const sectionTop = section.offsetTop;
          
          if (scrollPosition >= sectionTop) {
            const id = section.getAttribute('id')?.replace('section-', '') || null;
            if (activeSection !== id) {
              setActiveSection(id);
            }
            break;
          }
        }
      }, 100); // Debounce scroll events by 100ms
    };

    // Update active section when URL hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const sectionKey = hash.replace('section-', '');
        setActiveSection(sectionKey);
        
        // Set flag to ignore scroll events briefly after hash change
        isManualNavRef.current = true;
        setTimeout(() => {
          isManualNavRef.current = false;
        }, 1000); // Ignore scroll events for 1 second after hash change
      } else if (subPages.length > 0) {
        // Set first section as active if no hash
        const firstSectionKey = subPages[0]?._key || 
          subPages[0]?.title?.replace(/\s+/g, '-').toLowerCase();
        setActiveSection(firstSectionKey);
      }
    };

    // Initial checks
    handleHashChange();
    handleScroll();

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [subPages]); // Remove activeSection dependency to prevent re-running

  // Handle manual navigation click
  const handleNavClick = (sectionKey: string) => {
    setActiveSection(sectionKey);
    isManualNavRef.current = true;
    setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);
  };

  // Main navigation container styles
  const navClasses = [
    'fixed', 
    'top-0', 
    'left-0', 
    'w-full', 
    'h-16', // Assuming --nav-height is 4rem/h-16
    'flex', 
    'items-center', 
    'px-[5%]', // padding: 0 5%
    'border-b', 
    'border-gray-200', // Assuming --stroke maps to this
    'bg-white', // Assuming --background-color
    'z-50', // Assuming z-index: 100
  ].join(' ');

  // Inner container for logo and title
  const innerDivClasses = 'relative flex flex-row items-center';

  // Logo image styles
  const logoClasses = 'h-full max-h-10 object-contain'; // Adjust max-h-10 as needed

  // Divider line styles
  const lineClasses = 
    'w-px h-8 bg-gray-200 mx-4'; // Assuming --stroke-width: 1px, height calc, --stroke-color, margin

  // Sidebar navigation styles - improved sticky positioning
  const sidebarClasses = 'sticky top-20 flex flex-col space-y-4 h-full max-h-[calc(100vh-6rem)] overflow-y-auto pr-2';

  return (
    <>
      {/* Top Navigation Bar */}


      {/* Side Navigation for SubPages */}
      <div className={sidebarClasses}>
        {subPages?.length > 0 && (
          <nav className="space-y-2">
            <h3 className="font-semibold text-lg mb-3">Innhold</h3>
            {subPages.map((subPage, index) => {
              if (!subPage.title) return null;
              
              const sectionKey = subPage._key || subPage.title.replace(/\s+/g, '-').toLowerCase();
              const sectionId = `section-${sectionKey}`;
              const isActive = activeSection === sectionKey;
              
              return (
                <Link
                  key={sectionKey || index}
                  href={`${pathname}#${sectionId}`}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
                    isActive 
                      ? 'bg-blue-100 text-blue-800 font-medium' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => handleNavClick(sectionKey)}
                >
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-gray-200 text-gray-800 text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="flex-1">{subPage.title}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
};

export default Nav; 