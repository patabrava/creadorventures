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

  // Second row logos - now the only row
  const logosToDisplay = [
    {
      title: "The Hub",
      logo: "/images/portfolio/THE HUB LOGO .jpg",
      url: sortedItems.find(item => item.slug === 'the-hub')?.companyUrl || 'https://thehub.example.com'
    },
    {
      title: "Viio",
      logo: "/images/portfolio/viio.svg",
      url: "https://viio.com"
    }
  ];

  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-paper text-ink ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-center text-[clamp(56px,8vw,120px)] font-light leading-[1.05] mb-48">
          We give start-ups an<br />unfair advantage
        </h2>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 max-w-4xl mx-auto">
          {logosToDisplay.map((company, index) => (
            <div 
              key={`logo-${index}`}
              className="relative group cursor-pointer"
              onClick={() => handlePortfolioClick(company.title, company.url)}
            >
              <div className="aspect-[3/2] flex items-center justify-center p-8 bg-white/5 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:shadow-xl max-w-[400px] mx-auto w-full">
                <div className="relative w-full h-full max-w-[280px] max-h-[120px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={company.logo}
                    alt={`${company.title} logo`}
                    fill
                    style={{
                      objectFit: 'contain',
                      padding: '8%'
                    }}
                    className="transition-opacity duration-300"
                    priority={index < 2}
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">{company.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 