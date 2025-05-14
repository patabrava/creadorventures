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
      className={`${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'var(--space-xxxl) var(--space-lg)',
        position: 'relative',
        marginBottom: 0
      }}
    >
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontWeight: 300,
          fontSize: 'clamp(var(--font-size-xl), 5vw, var(--font-size-xxl))',
          lineHeight: 1.05,
          marginBottom: 'var(--space-xxl)',
          textAlign: 'center'
        }}>
          Ready to connect?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-xxl)',
          margin: 'var(--space-xxl) auto',
          maxWidth: '1200px'
        }}>
          {/* Contact Us CTA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'var(--space-lg)',
            minHeight: '360px',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ fontWeight: 300, fontSize: '36px', marginBottom: 'var(--space-lg)' }}>
              Contact Us
            </h3>
            <p style={{ marginBottom: 'var(--space-xl)', fontSize: '20px', lineHeight: 1.5 }}>
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'var(--space-lg)',
            minHeight: '360px',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ fontWeight: 300, fontSize: '36px', marginBottom: 'var(--space-lg)' }}>
              Apply for Funding
            </h3>
            <p style={{ marginBottom: 'var(--space-xl)', fontSize: '20px', lineHeight: 1.5 }}>
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'var(--space-lg)',
            minHeight: '360px',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ fontWeight: 300, fontSize: '36px', marginBottom: 'var(--space-lg)' }}>
              Become a Sponsor
            </h3>
            <p style={{ marginBottom: 'var(--space-xl)', fontSize: '20px', lineHeight: 1.5 }}>
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
    </section>
  );
} 