'use client';

import { useCallback } from 'react';

interface ScrollToSectionProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  darkBackground?: boolean;
}

/**
 * A component that handles smooth scrolling to a target section
 * Implements Neo-Brutalist Minimalism style guide transitions
 */
export default function ScrollToSection({ 
  targetId, 
  children, 
  className = '',
  onClick,
  darkBackground = true
}: ScrollToSectionProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Check if the user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Use the style guide's ease-slow transition for smooth scrolling
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      // Update URL hash without default jump
      window.history.pushState(null, '', `#${targetId}`);
    }

    // Call the additional onClick handler if provided
    if (onClick) {
      onClick();
    }
  }, [targetId, onClick]);

  return (
    <a 
      href={`#${targetId}`}
      onClick={handleClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: darkBackground ? 'var(--paper)' : 'var(--ink)',
        textDecoration: 'none',
        fontSize: 'var(--font-size-md)',
        transition: 'transform var(--transition-fast)',
        position: 'relative',
        paddingLeft: '28px' // Space for the arrow
      }}
    >
      <span 
        style={{
          position: 'absolute',
          left: 0,
          content: '""',
          transition: 'transform var(--transition-fast)'
        }}
        className="arrow-icon"
      >
        →
      </span>
      {children}
    </a>
  );
} 