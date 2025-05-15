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
  
  return (
    <main 
      className="min-h-screen bg-black text-white"
      style={{ 
        opacity: 1, 
        backgroundColor: 'black', 
        color: 'white',
        animation: 'none',
        transition: 'none'
      }}
    >
      {/* Hero Section */}
      <section 
        className="min-h-[80vh] py-24 px-6 flex flex-col justify-center"
        style={{ 
          opacity: 1, 
          backgroundColor: 'black', 
          color: 'white',
          animation: 'none',
          transition: 'none'
        }}
      >
        <div 
          className="container mx-auto max-w-[1440px] relative"
          style={{ 
            opacity: 1, 
            backgroundColor: 'black', 
            color: 'white',
            animation: 'none',
            transition: 'none'
          }}
        >
          <h1 
            className="font-light text-[clamp(56px,8vw,120px)] leading-[1.05] mb-16 max-w-[900px]"
            style={{ 
              opacity: 1, 
              color: 'white',
              animation: 'none',
              transition: 'none'
            }}
          >
            Events that <br />challenge conventions
          </h1>
          <p 
            className="text-lg leading-relaxed mb-24 max-w-[600px]"
            style={{ 
              opacity: 1, 
              color: 'white',
              animation: 'none',
              transition: 'none'
            }}
          >
            Join our community of founders, investors, and industry experts as we explore 
            overlooked opportunities and connect the next generation of innovators.
          </p>
          
          {/* Event Stats - Brutalist style */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-[900px] border-t-2 border-white pt-8"
            style={{ 
              opacity: 1, 
              backgroundColor: 'black', 
              color: 'white',
              animation: 'none',
              transition: 'none'
            }}
          >
            <div style={{ opacity: 1 }}>
              <div className="text-[72px] font-light leading-none" style={{ opacity: 1, color: 'white' }}>24+</div>
              <div className="text-gray-400 mt-2" style={{ opacity: 1 }}>Events per year</div>
            </div>
            <div style={{ opacity: 1 }}>
              <div className="text-[72px] font-light leading-none" style={{ opacity: 1, color: 'white' }}>500+</div>
              <div className="text-gray-400 mt-2" style={{ opacity: 1 }}>Attendees</div>
            </div>
            <div style={{ opacity: 1 }}>
              <div className="text-[72px] font-light leading-none" style={{ opacity: 1, color: 'white' }}>12</div>
              <div className="text-gray-400 mt-2" style={{ opacity: 1 }}>Countries</div>
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
      
      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={calendlyModalData.isOpen}
        onClose={handleCloseCalendly}
        calendlyUrl={calendlyModalData.calendlyUrl}
        fallbackEmail={calendlyModalData.fallbackEmail}
        title={calendlyModalData.title}
      />

      {/* Script to force animations off */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.body.style.opacity = 1;
          document.body.style.animation = 'none';
          document.body.style.transition = 'none';
          document.querySelectorAll('section').forEach(section => {
            section.style.opacity = 1;
            section.style.transform = 'none';
            section.style.animation = 'none';
            section.style.transition = 'none';
            section.classList.add('visible');
          });
        `
      }} />
    </main>
  );
} 