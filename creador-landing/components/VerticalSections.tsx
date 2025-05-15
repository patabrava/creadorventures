'use client';

import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VerticalSectionProps {
  title: string;
  description: string;
  imagePath?: string; // Optional image path for background
}

const verticalSections: VerticalSectionProps[] = [
  {
    title: 'Startup Sourcing and Events',
    description: 'We scout rising talent through cultural gatherings that mix music, art, and local tech scenes. Each event feeds the Startup League, giving partners a first look at high-potential teams.',
    imagePath: '/dark founders.png'
  },
  {
    title: 'Venture Studio',
    description: 'Our studio backs founders with capital, hands-on guidance, and shared resources. Current projects include The Hub, Fitchin, Solana ID, VIIO, and Heartstocks.',
    imagePath: '/ChatGPT Image 8. Mai 2025, 04_38_09.png'
  },
  {
    title: 'Psychology Research Advisory',
    description: 'PRA publishes open reports on counter-cyclical trends and runs bespoke studies for funds, corporates, and public bodies seeking clear insight into underdog markets.',
    imagePath: '/PRA.png'
  }
];

export default function VerticalSections() {
  const { ref, isVisible } = useAnimatedVisibility<HTMLDivElement>();
  const [isMobile, setIsMobile] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();
  
  // Check for window width on client side
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Use separate animation hooks for each vertical card for staggered entry
  const firstCardVisibility = useAnimatedVisibility<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const secondCardVisibility = useAnimatedVisibility<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const thirdCardVisibility = useAnimatedVisibility<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  
  // Individual visibility states for staggered animation
  const cardVisibility = [firstCardVisibility, secondCardVisibility, thirdCardVisibility];

  return (
    <section 
      id="verticals"
      ref={ref}
      className={`${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        padding: '80px 24px',
        width: '100%'
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: 'var(--space-lg)',
          letterSpacing: '-0.01em',
          color: 'var(--paper)'
        }}>
          Our Verticals
        </h2>
        
        {isMobile ? (
          // Mobile layout: single column
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '80px'
          }}>
            {verticalSections.map((section, index) => {
              const { ref, isVisible } = cardVisibility[index];
              const delay = index * 100; // staggered delay in ms
              const isStartupSourcing = index === 0;
              
              return (
                <div 
                  key={index} 
                  ref={ref}
                  style={{
                    position: 'relative',
                    height: '50vh',
                    backgroundColor: section.imagePath ? 'transparent' : 'var(--graphite-60)',
                    overflow: 'hidden',
                    transition: 'transform var(--transition-fast)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                    cursor: isStartupSourcing ? 'pointer' : 'default',
                    transform: hoveredCard === index ? 'translateY(-8px)' : isVisible ? 'translateY(0)' : 'translateY(20px)'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={isStartupSourcing ? () => router.push('/events#past-events') : undefined}
                >
                  {section.imagePath && (
                    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                      <Image 
                        src={section.imagePath}
                        alt={section.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-md)',
                    left: 'var(--space-md)',
                    color: 'var(--paper)',
                    maxWidth: '80%',
                    zIndex: 1
                  }}>
                    <h3 style={{
                      fontSize: '32px',
                      fontWeight: 300,
                      marginBottom: 'var(--space-sm)',
                      lineHeight: 1.2,
                      color: 'var(--paper)'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-md)',
                      lineHeight: '28px',
                      color: 'var(--paper)'
                    }}>
                      {section.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop layout: asymmetric grid with featured first item
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gridTemplateRows: 'auto auto',
            gridTemplateAreas: `
              "featured second"
              "featured third"
            `,
            gap: '24px',
            marginBottom: '80px'
          }}>
            {verticalSections.map((section, index) => {
              const { ref, isVisible } = cardVisibility[index];
              const delay = index * 100; // staggered delay in ms
              const isStartupSourcing = index === 0;
              
              return (
                <div 
                  key={index} 
                  ref={ref}
                  style={{
                    position: 'relative',
                    gridArea: index === 0 ? 'featured' : index === 1 ? 'second' : 'third',
                    height: index === 0 ? '80vh' : '39vh',
                    backgroundColor: section.imagePath ? 'transparent' : 'var(--graphite-60)',
                    overflow: 'hidden',
                    transition: 'transform var(--transition-fast)',
                    opacity: isVisible ? 1 : 0,
                    transform: hoveredCard === index ? 'translateY(-8px)' : isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${delay}ms`,
                    cursor: isStartupSourcing ? 'pointer' : 'default'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={isStartupSourcing ? () => router.push('/events#past-events') : undefined}
                >
                  {section.imagePath && (
                    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                      <Image 
                        src={section.imagePath}
                        alt={section.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-md)',
                    left: 'var(--space-md)',
                    color: 'var(--paper)',
                    maxWidth: '80%',
                    zIndex: 1
                  }}>
                    <h3 style={{
                      fontSize: index === 0 ? '48px' : '32px',
                      fontWeight: 300,
                      marginBottom: 'var(--space-sm)',
                      lineHeight: 1.2,
                      color: 'var(--paper)'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-md)',
                      lineHeight: '28px',
                      color: 'var(--paper)'
                    }}>
                      {section.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
} 