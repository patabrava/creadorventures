'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
  disableAnimation?: boolean;
}

/**
 * Hook that handles element visibility and animations
 * Follows Neo-Brutalist Minimalism style guide specifications
 * Respects user's preference for reduced motion
 */
export function useAnimatedVisibility<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  disableAnimation = false,
}: AnimatedVisibilityOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Skip animation if explicitly disabled or if user prefers reduced motion
    const prefersReducedMotion = 
      disableAnimation || 
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    // If animation is disabled, immediately set as visible
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    // Style guide specifies:
    // --transition-slow: 600ms cubic-bezier(0.35, 0, 0.25, 1);
    // section { opacity: 0.1; transform: translateY(40px); }
    // section.visible { opacity: 1; transform: translateY(0); }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When element enters viewport, make it visible and unobserve
          if (entry.isIntersecting) {
            // Add a small delay before changing visibility
            // This creates the staggered effect when multiple elements appear
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, disableAnimation]);
  
  return { ref, isVisible };
} 