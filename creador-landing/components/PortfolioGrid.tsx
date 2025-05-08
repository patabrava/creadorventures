'use client';

import { Portfolio } from 'contentlayer/generated';
import Image from 'next/image';
import { trackEvent } from '@/core/analytics';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

interface PortfolioGridProps {
  items: Portfolio[];
}

/**
 * A responsive grid to display portfolio companies following the neo-brutalist style
 */
export default function PortfolioGrid({ items }: PortfolioGridProps) {
  // Animation hook to work with global CSS section visibility
  const { ref, isVisible } = useAnimatedVisibility();

  // Sort items by order field
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const handlePortfolioClick = (title: string, url: string) => {
    // Track click event for analytics
    trackEvent('cta_click', { 
      cta_text: `Portfolio: ${title}`,
      destination: url
    });
    
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-ink text-paper ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-[48px] font-light leading-tight mb-8">Portfolio</h2>
        <p className="text-[18px] leading-[28px] mb-16 max-w-[800px]">
          A growing collection of companies and protocols shaped inside Creador Labs. 
          Each tile links to an external deep dive.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {sortedItems.map((item) => (
            <div 
              key={item.slug}
              className="portfolio-tile relative h-[50vh] overflow-hidden border-2 border-paper transition-transform hover:translate-y-[-8px] cursor-pointer"
              onClick={() => handlePortfolioClick(item.title, item.companyUrl)}
            >
              {/* Image container with solid background */}
              <div className="relative w-full h-[calc(100%-80px)] bg-paper">
                <Image 
                  src={item.thumbnail}
                  alt={`${item.title} thumbnail`}
                  className="object-cover"
                  fill
                  priority={item.featured}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Solid background for text area */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-paper border-t-2 border-paper z-10" />
              
              {/* Logo */}
              <div className="absolute top-6 left-6 z-20 bg-paper p-2 border border-ink">
                <Image 
                  src={item.logo}
                  alt={`${item.title} logo`}
                  className="w-auto h-auto"
                  width={80}
                  height={32}
                />
              </div>
              
              {/* Title */}
              <h3 className="absolute bottom-6 left-6 text-[28px] font-light z-20 max-w-[80%] text-ink">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 