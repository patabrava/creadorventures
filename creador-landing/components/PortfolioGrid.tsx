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

  // Find The Hub in the sorted items, if it exists
  const theHubItem = sortedItems.find(item => item.slug === 'the-hub');
  const theHubUrl = theHubItem?.companyUrl || 'https://thehub.example.com';

  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-paper text-ink ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-center text-[clamp(56px,8vw,120px)] font-light leading-[1.05] mb-[var(--space-xxxl)]">
          We give start-ups an<br />unfair advantage
        </h2>
        
        {/* First row of logos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Special placement for THE HUB logo using the jpg version */}
          <div 
            className="flex items-center justify-center cursor-pointer transition-transform hover:translate-y-[-8px]"
            onClick={() => handlePortfolioClick('The Hub', theHubUrl)}
          >
            <div className="relative h-[60px] w-full">
              <Image 
                src="/images/portfolio/THE HUB LOGO .jpg"
                alt="The Hub logo"
                className="object-contain"
                fill
                priority={true}
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          </div>
          
          {/* Rest of the first row logos, excluding The Hub if it's in first 4 items */}
          {sortedItems
            .filter(item => item.slug !== 'the-hub')
            .slice(0, 4)
            .map((item) => (
              <div 
                key={item.slug}
                className="flex items-center justify-center cursor-pointer transition-transform hover:translate-y-[-8px]"
                onClick={() => handlePortfolioClick(item.title, item.companyUrl)}
              >
                <div className="relative h-[40px] w-full">
                  <Image 
                    src={item.logo}
                    alt={`${item.title} logo`}
                    className="object-contain"
                    fill
                    priority={item.featured}
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              </div>
            ))}
        </div>
        
        {/* Second row of logos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Add viio logo as a special case */}
          <div 
            className="flex items-center justify-center cursor-pointer transition-transform hover:translate-y-[-8px]"
            onClick={() => handlePortfolioClick('Viio', 'https://viio.com')}
          >
            <div className="relative h-[40px] w-full">
              <Image 
                src="/images/portfolio/viio.svg"
                alt="Viio logo"
                className="object-contain"
                fill
                priority={false}
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          </div>
          
          {sortedItems
            .filter(item => item.slug !== 'the-hub')
            .slice(4, 8) /* Reduced from 9 to 8 to make room for viio */
            .map((item) => (
              <div 
                key={item.slug}
                className="flex items-center justify-center cursor-pointer transition-transform hover:translate-y-[-8px]"
                onClick={() => handlePortfolioClick(item.title, item.companyUrl)}
              >
                <div className="relative h-[40px] w-full">
                  <Image 
                    src={item.logo}
                    alt={`${item.title} logo`}
                    className="object-contain"
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
} 