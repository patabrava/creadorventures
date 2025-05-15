'use client';

import { useState } from 'react';
import EventsArchive, { EventItem } from '@/components/EventsArchive';
import CalendlyModal from '@/components/CalendlyModal';
import Link from 'next/link';
import CtaButton from '@/components/CtaButton';

// Sample data for the EventsArchive component
const sampleEvents: EventItem[] = [
  {
    id: 'grit-bogota',
    title: 'GRIT Bogota',
    date: 'March 25, 2024',
    previewImage: 'https://picsum.photos/seed/gritbogota/800/450',
    previewVideoSrc: '/videos/0515.mp4',
    vimeoId: '1084443296',
    width: 16,
    height: 9,
  },
  {
    id: 'metapartyhub-bogota',
    title: 'MetaPartyHub Bogota',
    date: 'October 20, 2023',
    previewImage: 'https://picsum.photos/seed/metapartyhub/800/450',
    previewVideoSrc: '/videos/kaputtcompressed.mp4',
    vimeoId: '1084461559',
    width: 9,
    height: 16,
  },
  {
    id: 'grit-ba',
    title: 'Grit Buenos Aires',
    date: 'August 12, 2023',
    previewImage: 'https://picsum.photos/seed/gritba/800/450',
    previewVideoSrc: '/videos/grit ba compressed .mp4',
    vimeoId: '1084461541',
    width: 9,
    height: 16,
  },
];

// Sponsor CTA data
const sponsorCTA = {
  title: 'Become a Sponsor',
  description: 'Support our events and connect with the most promising entrepreneurs in Latin America.',
  calendlyUrl: 'https://calendly.com/creador/sponsor',
  fallbackEmail: 'sponsors@creadorventures.com',
};

export default function EventsPage() {
  // State for Calendly modal
  const [calendlyModalData, setCalendlyModalData] = useState<{
    isOpen: boolean;
    title: string;
    calendlyUrl: string;
    fallbackEmail: string;
  }>({
    isOpen: false,
    title: '',
    calendlyUrl: '',
    fallbackEmail: '',
  });
  
  // Handle opening Calendly modal
  const handleOpenCalendly = (title: string, calendlyUrl: string, fallbackEmail: string) => {
    setCalendlyModalData({
      isOpen: true,
      title,
      calendlyUrl,
      fallbackEmail,
    });
  };
  
  // Handle closing Calendly modal
  const handleCloseCalendly = () => {
    setCalendlyModalData((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };
  
  // Register for event handler
  const handleRegister = (eventId: string) => {
    console.log(`Registering for event: ${eventId}`);
    // In a real app, this would open a registration form or redirect
  };
  
  // Common style for full visibility with black background and white text
  const visibleStyle = {
    opacity: 1,
    transform: 'none',
    visibility: 'visible' as const,
    color: 'var(--paper)',
    backgroundColor: 'var(--ink)'
  };
  
  return (
    <main 
      className="min-h-screen bg-ink text-paper" 
      style={{ 
        opacity: 1,
        transform: 'none',
        visibility: 'visible',
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)'
      }}
    >
      {/* Hero Section */}
      <section 
        className="min-h-screen py-24 px-6 relative overflow-visible bg-ink text-paper flex flex-col justify-center"
        style={{ 
          opacity: 1,
          transform: 'none',
          visibility: 'visible',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="container mx-auto max-w-[1440px] relative z-10"
          style={{ opacity: 1 }}
        >
          <h1 
            className="font-light text-[clamp(56px,8vw,120px)] leading-[1.05] mb-16 max-w-[900px]"
            style={{ 
              opacity: 1,
              color: 'var(--paper)',
              fontWeight: 300
            }}
          >
            Events that <br />challenge conventions
          </h1>
          <p 
            className="text-[18px] leading-[28px] mb-24 max-w-[600px] text-paper"
            style={{ opacity: 1, color: 'var(--paper)' }}
          >
            Join our community of founders, investors, and industry experts as we explore 
            overlooked opportunities and connect the next generation of innovators.
          </p>
          
          {/* Event Stats */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-[900px]"
            style={{ 
              opacity: 1,
              position: 'relative',
              zIndex: 10
            }}
          >
            <div>
              <div 
                className="text-[72px] font-light leading-none text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >24+</div>
              <div 
                className="text-graphite-40 mt-2"
                style={{ opacity: 1 }}
              >Events per year</div>
            </div>
            <div>
              <div 
                className="text-[72px] font-light leading-none text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >500+</div>
              <div 
                className="text-graphite-40 mt-2"
                style={{ opacity: 1 }}
              >Attendees</div>
            </div>
            <div>
              <div 
                className="text-[72px] font-light leading-none text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >12</div>
              <div 
                className="text-graphite-40 mt-2"
                style={{ opacity: 1 }}
              >Countries</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Archive Section */}
      <EventsArchive 
        events={sampleEvents}
        sponsorCTA={sponsorCTA}
        onOpenCalendly={handleOpenCalendly}
      />
      
      {/* Sponsor Section */}
      <section 
        className="pt-8 px-6 bg-ink text-paper"
        style={{ 
          opacity: 1,
          transform: 'none',
          visibility: 'visible',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          marginBottom: 0,
          paddingBottom: '4rem'
        }}
      >
        <div 
          className="container mx-auto max-w-[1440px]"
          style={{ opacity: 1 }}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            style={{ opacity: 1 }}
          >
            <div style={{ opacity: 1 }}>
              <h2 
                className="text-[48px] font-light leading-tight mb-8 text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >
                {sponsorCTA.title}
              </h2>
              <p 
                className="text-[18px] leading-[28px] mb-8 text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >
                {sponsorCTA.description}
              </p>
            </div>
            <div style={{ opacity: 1 }} className="flex items-center justify-center">
              <CtaButton
                onClick={() => handleOpenCalendly(sponsorCTA.title, sponsorCTA.calendlyUrl, sponsorCTA.fallbackEmail)}
                variant="dark"
                size="large"
              >
                Schedule a Call
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={calendlyModalData.isOpen}
        onClose={handleCloseCalendly}
        calendlyUrl={calendlyModalData.calendlyUrl}
        fallbackEmail={calendlyModalData.fallbackEmail}
        title={calendlyModalData.title}
      />
    </main>
  );
} 