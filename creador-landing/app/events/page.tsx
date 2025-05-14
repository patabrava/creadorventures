'use client';

import { useState } from 'react';
import EventsArchive, { EventItem } from '@/components/EventsArchive';
import CalendlyModal from '@/components/CalendlyModal';

// Sample data for the EventsArchive component
const sampleEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'AI Ethics Summit',
    date: 'November 15, 2023',
    previewImage: 'https://picsum.photos/seed/event1/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 16,
    height: 9,
  },
  {
    id: 'event-2',
    title: 'Startup Funding Workshop',
    date: 'October 20, 2023',
    previewImage: 'https://picsum.photos/seed/event2/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 16,
    height: 9,
  },
  {
    id: 'event-3',
    title: 'Tech Talent Meetup',
    date: 'September 5, 2023',
    previewImage: 'https://picsum.photos/seed/event3/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    width: 4,
    height: 3,
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
    <main>
      {/* Events Archive Section */}
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
    </main>
  );
} 