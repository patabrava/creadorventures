'use client';

import { useEffect } from 'react';

// Global cursor style component
export default function GlobalCursorStyle() {
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Set the CSS text
    styleEl.textContent = `
      /* Hide default cursor on elements with custom cursor */
      [data-custom-cursor="true"],
      [data-custom-cursor="true"] * {
        cursor: none !important;
      }
      
      /* Additional cursor-related styles */
      .custom-cursor {
        will-change: transform;
        z-index: 9999;
        pointer-events: none;
      }
    `;
    
    // Append to the head
    document.head.appendChild(styleEl);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
} 