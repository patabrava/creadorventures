'use client';

import { Portfolio } from 'contentlayer/generated';
import Image from 'next/image';
import { trackEvent } from '@/core/analytics';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

interface PortfolioGridProps {
  items: Portfolio[];
}

/**
 * A responsive portfolio grid following neo-brutalist minimalism
 * Displays company logos in a horizontally aligned grid
 */
export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const { ref, isVisible } = useAnimatedVisibility();

  const handlePortfolioClick = (title: string, url: string) => {
    trackEvent('cta_click', { 
      cta_text: `Portfolio: ${title}`,
      destination: url
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Portfolio logos matching reference image but with only our two
  const portfolioCompanies = [
    {
      title: "The Hub",
      logo: "/images/portfolio/THE HUB LOGO .jpg", 
      url: items.find(item => item.slug === 'the-hub')?.companyUrl || 'https://thehub.io'
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
      className={`${isVisible ? 'visible' : ''}`}
      style={{
        padding: '80px 24px 120px',
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Headline styled similarly to Hero component */}
        <h2 style={{
          fontWeight: 300,
          fontSize: 'clamp(56px, 8vw, 120px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '120px',
          color: 'var(--ink)',
          textAlign: 'center'
        }}>
          We give start-ups an<br />unfair advantage
        </h2>
        
        {/* Logo grid - horizontally centered with substantial spacing */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '80px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {portfolioCompanies.map((company, index) => (
            <div 
              key={`logo-${index}`}
              onClick={() => handlePortfolioClick(company.title, company.url)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 300ms ease',
                width: '100px',
                height: '50px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image 
                  src={company.logo}
                  alt={`${company.title} logo`}
                  fill
                  style={{ 
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 