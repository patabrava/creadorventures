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

  // First row logos
  const firstRowLogos = [
    {
      title: "Rivian",
      logo: "/images/portfolio/rivian.svg",
      url: "https://rivian.com"
    },
    {
      title: "Rappi",
      logo: "/images/portfolio/rappi.svg", 
      url: "https://rappi.com"
    },
    {
      title: "Moxion",
      logo: "/images/portfolio/moxion.svg",
      url: "https://moxion.com"
    },
    {
      title: "Oura",
      logo: "/images/portfolio/oura.svg",
      url: "https://ouraring.com"
    },
    {
      title: "ListAcross",
      logo: "/images/portfolio/listacross.svg",
      url: "https://listacross.com"
    }
  ];

  // Second row logos
  const secondRowLogos = [
    {
      title: "The Hub",
      logo: "/images/portfolio/THE HUB LOGO .jpg",
      url: sortedItems.find(item => item.slug === 'the-hub')?.companyUrl || 'https://thehub.example.com'
    },
    {
      title: "Viio",
      logo: "/images/portfolio/viio.svg",
      url: "https://viio.com"
    },
    {
      title: "Kanarys",
      logo: "/images/portfolio/kanarys.svg",
      url: "https://kanarys.com"
    },
    {
      title: "Connect Homes",
      logo: "/images/portfolio/connect-homes.svg",
      url: "https://connect-homes.com"
    },
    {
      title: "OV Loop",
      logo: "/images/portfolio/ovloop.svg",
      url: "https://ovloop.com"
    }
  ];

  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-paper text-ink ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-center text-[clamp(56px,8vw,120px)] font-light leading-[1.05] mb-96">
          We give start-ups an<br />unfair advantage
        </h2>
        
        {/* First row of logos */}
        <div className="mb-32 flex justify-between items-center">
          {firstRowLogos.map((company, index) => (
            <div 
              key={`row1-${index}`}
              className="cursor-pointer hover:translate-y-[-8px] transition-transform duration-300"
              onClick={() => handlePortfolioClick(company.title, company.url)}
            >
              <Image 
                src={company.logo}
                alt={`${company.title} logo`}
                width={120}
                height={40}
                style={{
                  maxWidth: '120px',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                priority={true}
              />
            </div>
          ))}
        </div>
        
        {/* Second row of logos */}
        <div className="flex justify-between items-center">
          {secondRowLogos.map((company, index) => (
            <div 
              key={`row2-${index}`}
              className="cursor-pointer hover:translate-y-[-8px] transition-transform duration-300"
              onClick={() => handlePortfolioClick(company.title, company.url)}
            >
              <Image 
                src={company.logo}
                alt={`${company.title} logo`}
                width={120}
                height={40}
                style={{
                  maxWidth: '120px',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 