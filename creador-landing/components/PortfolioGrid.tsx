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
        padding: '80px 24px',
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        {/* Using the cinematic scale typography as specified in the style guide */}
        <h2 
          style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 'var(--space-xxxl)',
            color: 'var(--ink)',
            textAlign: 'center'
          }}
        >
          We give start-ups an<br />unfair advantage
        </h2>
        
        {/* Logo grid positioned to match reference image */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-xxl)',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {portfolioCompanies.map((company, index) => (
            <div 
              key={`logo-${index}`}
              onClick={() => handlePortfolioClick(company.title, company.url)}
              style={{
                cursor: 'pointer',
                transition: 'transform var(--transition-fast)',
                width: '110px',
                height: '45px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Image 
                  src={company.logo}
                  alt={`${company.title} logo`}
                  fill
                  style={{ 
                    objectFit: 'contain'
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