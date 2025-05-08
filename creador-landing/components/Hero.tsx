'use client';

import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

interface HeroProps {
  headline: string;
  subheadline: string;
}

export default function Hero({ headline, subheadline }: HeroProps) {
  const { ref, isVisible } = useAnimatedVisibility<HTMLDivElement>();
  
  return (
    <section 
      id="hero"
      ref={ref}
      className={`${isVisible ? 'visible' : ''}`}
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100vh',
        position: 'relative',
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        overflow: 'hidden',
        marginTop: '-80px'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px'
      }}>
        {/* Background would be a video in production version */}
        
        <div style={{
          width: '100%',
          paddingLeft: 'var(--space-lg)',
          paddingRight: 'var(--space-lg)',
          zIndex: 1
        }}>
          <div className="container">
            <h1 style={{
              fontWeight: 300,
              fontSize: 'clamp(56px, 8vw, 120px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-md)',
              color: 'var(--paper)',
              maxWidth: '1200px'
            }}>
              {headline}
            </h1>
            <p style={{
              fontSize: 'var(--font-size-md)',
              lineHeight: '28px',
              maxWidth: '800px',
              marginBottom: 'var(--space-xl)',
              color: 'var(--paper)'
            }}>
              {subheadline}
            </p>
          </div>
        </div>
        
        {/* Scroll anchor with ghost circle button as in style guide */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 2
        }}>
          <a 
            href="#verticals" 
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('verticals');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              color: 'var(--paper)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              border: '1px solid var(--paper)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '24px',
              cursor: 'pointer',
              transition: 'border-width 0.3s'
            }}>
              <span style={{
                fontSize: '24px',
                transition: 'transform 0.3s'
              }}>↓</span>
            </div>
            <p style={{ 
              marginTop: 'var(--space-xs)',
              color: 'var(--paper)'
            }}>
              Scroll down
            </p>
          </a>
        </div>
      </div>
    </section>
  );
} 