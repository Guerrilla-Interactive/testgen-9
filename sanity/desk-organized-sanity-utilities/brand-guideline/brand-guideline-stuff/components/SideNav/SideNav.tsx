import React from 'react';
// NOTE: Update imports when gatsby/helpers are converted/typed
import { Link } from 'gatsby'; 
import { cn, slugify } from '../../lib/helpers'; 

// Interface for a single subpage item
interface SubPage {
  title: string;
}

// Interface for the main component props
interface SideNavProps {
  subPages?: SubPage[];
}

const SideNav: React.FC<SideNavProps> = ({ subPages }) => {
  if (!subPages || subPages.length === 0) {
    return null; // Return null if no subpages
  }

  // Wrapper styles - Note: min-height might need CSS variable definitions in Tailwind config
  const wrapperClasses = 
    'border-r border-gray-200 h-full min-h-[calc(100vh_-_4rem_-_4rem)] pt-16 pr-8 flex justify-end'; // Assuming nav/footer height = 4rem
  
  // List styles
  const ulClasses = 'list-none p-0 pr-4 space-y-4'; // Use space-y for margin between items

  // Base link styles including pseudo-element setup
  const baseLinkClasses = [
    'relative', 
    'block', 
    'py-2', 
    'text-gray-600', 
    'no-underline', 
    'transition-all', 
    'duration-200', 
    'ease-in-out', 
    'hover:text-gray-900',
    // Before pseudo-element for active indicator
    "before:content-['']",
    'before:absolute',
    'before:left-[-16px]',
    'before:top-0',
    'before:w-1',
    'before:h-[calc(100%_-_1rem)]',
    'before:my-2',
    'before:bg-gray-900',
    'before:opacity-0',
    'before:translate-x-[-1rem]',
    'before:rounded-sm',
    'before:transition-all',
    'before:duration-200',
    'before:ease-in-out'
  ].join(' ');

  // Active link styles (applied via activeClassName)
  const activeLinkClasses = 'text-gray-900 before:opacity-100 before:translate-x-0';

  return (
    <nav className={wrapperClasses}>
      <ul className={ulClasses}>
        {subPages.map(({ title }) => (
          <li key={`sidenav-${title}`}>
            <Link
              // Combine base and active classes for activeClassName
              activeClassName={cn(baseLinkClasses, activeLinkClasses)} 
              className={baseLinkClasses}
              to={`/${slugify(title)}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav; 