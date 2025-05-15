'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CtaButton from './CtaButton';
import CalendlyModal from './CalendlyModal';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

interface CTAProps {
  id: string;
}

export default function CTASection({ id }: CTAProps) {
  const { ref, isVisible } = useAnimatedVisibility<HTMLElement>();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();
  
  const closeModal = () => setActiveModal(null);

  // Mock calendly URLs - would be configured in environment variables in production
  const calendlyUrls = {
    contact: 'https://calendly.com/creador-ventures/30min',
    sponsor: 'https://calendly.com/creador-ventures/sponsor-meeting',
  };
  
  // Fallback email in case Calendly fails
  const fallbackEmail = 'biz@creador.vc';
  
  return (
    <section 
      id={id}
      ref={ref}
      className={`cta-section ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        position: 'relative',
        marginBottom: 0
      }}
    >
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="cta-title" style={{
          fontWeight: 300,
          fontSize: 'clamp(var(--font-size-xl), 5vw, var(--font-size-xxl))',
          lineHeight: 1.05,
          textAlign: 'center'
        }}>
          Ready to connect?
        </h2>
        
        <div className="cta-grid" style={{
          maxWidth: '1200px'
        }}>
          {/* Contact Us CTA */}
          <div className="cta-item" style={{
          }}>
            <h3 style={{ fontWeight: 300 }}>
              Contact Us
            </h3>
            <p>
              Book a call to discuss partnership opportunities or learn more about our verticals.
            </p>
            <CtaButton 
              variant="dark" 
              size="large"
              onClick={() => {
                setActiveModal('contact');
                // Track with GA4
                try {
                  // TODO: Implement GA4 tracking
                  // window.gtag?.('event', 'cta_click', { cta_type: 'contact_us' });
                } catch (e) {
                  console.warn('GA4 tracking failed:', e);
                }
              }}
            >
              Book a call
            </CtaButton>
          </div>
          
          {/* Apply for Funding CTA */}
          <div className="cta-item" style={{
          }}>
            <h3 style={{ fontWeight: 300 }}>
              Apply for Funding
            </h3>
            <p>
              Send your deck and apply for funding through our streamlined process.
            </p>
            <CtaButton 
              variant="dark" 
              size="large"
              onClick={() => {
                // For funding applications, we'd redirect to a form page
                // This would be implemented in the forms phase
                router.push('/apply');
                // Track with GA4
                try {
                  // TODO: Implement GA4 tracking
                  // window.gtag?.('event', 'cta_click', { cta_type: 'apply_funding' });
                } catch (e) {
                  console.warn('GA4 tracking failed:', e);
                }
              }}
            >
              Send your deck
            </CtaButton>
          </div>
          
          {/* Become a Sponsor CTA */}
          <div className="cta-item" style={{
          }}>
            <h3 style={{ fontWeight: 300 }}>
              Become a Sponsor
            </h3>
            <p>
              Schedule a call to discuss sponsoring our next event or initiative.
            </p>
            <CtaButton 
              variant="dark" 
              size="large"
              onClick={() => {
                setActiveModal('sponsor');
                // Track with GA4
                try {
                  // TODO: Implement GA4 tracking
                  // window.gtag?.('event', 'cta_click', { cta_type: 'sponsor' });
                } catch (e) {
                  console.warn('GA4 tracking failed:', e);
                }
              }}
            >
              Book a Call
            </CtaButton>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <CalendlyModal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
        calendlyUrl={calendlyUrls.contact}
        fallbackEmail={fallbackEmail}
        title="Book a Call"
      />
      
      {/* Sponsor Modal */}
      <CalendlyModal
        isOpen={activeModal === 'sponsor'}
        onClose={closeModal}
        calendlyUrl={calendlyUrls.sponsor}
        fallbackEmail={fallbackEmail}
        title="Book a Call"
      />
      <style jsx>{`
        .cta-section {
          padding: var(--space-xl) var(--space-lg);
        }
        .cta-title {
          margin-bottom: var(--space-lg);
        }
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
          margin: var(--space-xl) auto;
          max-width: 1200px;
        }
        .cta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-lg);
          min-height: auto;
          justify-content: space-between;
          border: 1px solid var(--paper- आम्ही-alpha-20, rgba(255,255,255,0.2));
          border-radius: var(--border-radius-md, 8px);
        }
        .cta-item h3 {
          font-size: 28px;
          margin-bottom: var(--space-md);
          line-height: 1.2;
        }
        .cta-item p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: var(--space-lg);
          flex-grow: 1;
        }
        
        @media (min-width: 768px) {
          .cta-section {
            padding: var(--space-xxl) var(--space-lg);
          }
          .cta-title {
            margin-bottom: var(--space-xl);
          }
          .cta-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-xl);
            margin: var(--space-xl) auto;
          }
          .cta-item h3 {
            font-size: 32px;
            margin-bottom: var(--space-lg);
          }
          .cta-item p {
            font-size: 18px;
            margin-bottom: var(--space-xl);
          }
        }

        @media (min-width: 1024px) {
          .cta-section {
            padding: var(--space-xxxl) var(--space-lg);
          }
          .cta-title {
            margin-bottom: var(--space-xxl);
          }
          .cta-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-xxl);
            margin: var(--space-xxl) auto;
          }
          .cta-item {
            padding: var(--space-lg);
            min-height: 360px;
          }
          .cta-item h3 {
            font-size: 36px;
            margin-bottom: var(--space-lg);
          }
          .cta-item p {
            font-size: 20px;
            margin-bottom: var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
} 