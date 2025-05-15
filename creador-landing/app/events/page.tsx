'use client';

import { useState } from 'react';
import EventsArchive, { EventItem } from '@/components/EventsArchive';
import CalendlyModal from '@/components/CalendlyModal';
import Link from 'next/link';

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
    id: 'event-2',
    title: 'Startup Funding Workshop',
    date: 'October 20, 2023',
    previewImage: 'https://picsum.photos/seed/event2/800/450',
    previewVideoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 16,
    height: 9,
  },
  {
    id: 'event-3',
    title: 'Tech Talent Meetup',
    date: 'September 5, 2023',
    previewImage: 'https://picsum.photos/seed/event3/800/450',
    previewVideoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 4,
    height: 3,
  },
  {
    id: 'event-4',
    title: 'Venture Capital Panel',
    date: 'August 12, 2023',
    previewImage: 'https://picsum.photos/seed/event4/800/450',
    previewVideoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 16,
    height: 9,
  },
  {
    id: 'event-5',
    title: 'Blockchain Innovation Forum',
    date: 'July 28, 2023',
    previewImage: 'https://picsum.photos/seed/event5/800/450',
    previewVideoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 3,
    height: 4,
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
        className="py-12 pb-6 px-6 relative overflow-hidden bg-ink text-paper"
        style={{ 
          opacity: 1,
          transform: 'none',
          visibility: 'visible',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)'
        }}
      >
        <div 
          className="container mx-auto max-w-[1440px] relative z-10"
          style={{ opacity: 1 }}
        >
          <h1 
            className="font-light text-[clamp(56px,8vw,120px)] leading-[1.05] mb-8 max-w-[900px]"
            style={{ 
              opacity: 1,
              color: 'var(--paper)',
              fontWeight: 300
            }}
          >
            Events that <br />challenge conventions
          </h1>
          <p 
            className="text-[18px] leading-[28px] mb-12 max-w-[600px] text-paper"
            style={{ opacity: 1, color: 'var(--paper)' }}
          >
            Join our community of founders, investors, and industry experts as we explore 
            overlooked opportunities and connect the next generation of innovators.
          </p>
          
          {/* Event Stats */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 max-w-[900px]"
            style={{ opacity: 1 }}
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
      
      {/* Newsletter Section */}
      <section 
        className="py-24 px-6 bg-ink text-paper border-t border-b border-paper"
        style={{ 
          opacity: 1,
          transform: 'none',
          visibility: 'visible',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          borderColor: 'var(--paper)'
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
                Stay informed about <br />upcoming events
              </h2>
              <p 
                className="text-[18px] leading-[28px] mb-8 text-paper"
                style={{ opacity: 1, color: 'var(--paper)' }}
              >
                Subscribe to our newsletter to receive invitations to exclusive events and updates on our programs.
              </p>
            </div>
            <div style={{ opacity: 1 }}>
              <form className="flex flex-col" style={{ opacity: 1 }}>
                <div className="mb-8" style={{ opacity: 1 }}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="underline-input w-full bg-transparent border-b border-paper p-4 text-[18px] text-paper"
                    required
                    style={{ 
                      opacity: 1, 
                      borderColor: 'var(--paper)', 
                      color: 'var(--paper)',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="self-start bg-paper text-ink rounded-full px-8 py-2 inline-flex items-center transition-transform hover:translate-y-[-2px] hover:shadow-lg"
                  style={{ 
                    opacity: 1, 
                    backgroundColor: 'var(--paper)', 
                    color: 'var(--ink)' 
                  }}
                >
                  <span className="mr-2">→</span>
                  Subscribe
                </button>
              </form>
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