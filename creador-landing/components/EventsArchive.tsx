'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/core/analytics';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  previewImage: string;
  videoUrl?: string;
  width: number;
  height: number;
}

interface SponsorCTA {
  title: string;
  description: string;
  calendlyUrl: string;
  fallbackEmail: string;
}

interface EventsArchiveProps {
  events: EventItem[];
  sponsorCTA: SponsorCTA;
  onOpenCalendly: (title: string, calendlyUrl: string, fallbackEmail: string) => void;
}

/**
 * Events Archive Component
 * Displays a masonry gallery of past events with video previews
 * Implements Neo-Brutalist Minimalism style guide
 */
export default function EventsArchive({ 
  events, 
  sponsorCTA, 
  onOpenCalendly 
}: EventsArchiveProps) {
  const { ref, isVisible } = useAnimatedVisibility();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Calculate layout columns based on screen width
  const masonryRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  
  // Recalculate columns on resize
  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 3;
    };
    
    const handleResize = () => {
      const newColumns = calculateColumns();
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };
    
    // Initial calculation
    setColumns(calculateColumns());
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);
  
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Handle opening video modal
  const openModal = (event: EventItem) => {
    setSelectedEvent(event);
    setVideoError(false);
    
    // Track event view
    trackEvent('event_video_open', {
      event_title: event.title,
      event_date: event.date
    });
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
  };
  
  // Handle closing video modal
  const closeModal = () => {
    setSelectedEvent(null);
    setVideoError(false);
    
    // Release scroll lock
    document.body.style.overflow = '';
    
    // Pause video if playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    console.error(`Video failed to load: ${selectedEvent?.videoUrl}`);
    
    // Track error
    if (selectedEvent) {
      trackEvent('event_video_error', {
        event_title: selectedEvent.title,
        event_date: selectedEvent.date
      });
    }
  };
  
  // Handle CTA click
  const handleCTAClick = () => {
    onOpenCalendly(
      sponsorCTA.title,
      sponsorCTA.calendlyUrl,
      sponsorCTA.fallbackEmail
    );
    
    // Track click
    trackEvent('sponsor_call_booked', {
      cta_origin: 'events_archive'
    });
  };
  
  // Handle keyboard events for modal
  useEffect(() => {
    if (!selectedEvent) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);
  
  // Focus trap for modal
  useEffect(() => {
    if (!selectedEvent || !modalRef.current) return;
    
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus first element when modal opens
    firstElement.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // If shift+tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If tab on last element, cycle to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [selectedEvent]);

  // Create masonry layout groups
  const createMasonryGroups = () => {
    const groups: EventItem[][] = Array.from({ length: columns }, () => []);
    
    // Distribute events across columns, accounting for items of different heights
    sortedEvents.forEach((event, index) => {
      // Simple distribution strategy: put in column with least items
      const shortestColumn = groups
        .map((column, i) => ({ 
          index: i, 
          height: column.reduce((sum, item) => sum + item.height / item.width, 0) 
        }))
        .sort((a, b) => a.height - b.height)[0].index;
      
      groups[shortestColumn].push(event);
    });
    
    return groups;
  };
  
  // Add sponsor CTA to the gallery
  const injectSponsorCTA = (groups: EventItem[][]) => {
    // Position sponsor CTA after first few items for visibility
    const targetPosition = Math.min(2, groups.length - 1);
    
    // Create a fake event for the sponsor card with a special id
    const sponsorCard: EventItem = {
      id: 'sponsor-cta',
      title: sponsorCTA.title,
      date: '',
      previewImage: '',
      width: 1,
      height: 1
    };
    
    // Add to a column, keeping it near the top
    const targetIdx = Math.min(1, groups[targetPosition].length);
    groups[targetPosition].splice(targetIdx, 0, sponsorCard);
    
    return groups;
  };
  
  const masonryGroups = injectSponsorCTA(createMasonryGroups());
  
  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-paper text-ink ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-[48px] font-light leading-tight mb-8">Events Archive</h2>
        <p className="text-[18px] leading-[28px] mb-16 max-w-[800px]">
          Explore past events from our GRIT program, featuring valuable insights and conversations.
        </p>
        
        {/* Masonry Gallery */}
        <div 
          ref={masonryRef} 
          className="flex gap-6 mb-20"
          style={{ minHeight: '200px' }}
        >
          {masonryGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="flex-1 flex flex-col gap-6">
              {group.map((item) => (
                item.id === 'sponsor-cta' ? (
                  // Sponsor CTA Card
                  <div 
                    key="sponsor-cta"
                    className="relative bg-ink text-paper p-8 cursor-pointer transition-transform hover:translate-y-[-8px]"
                    onClick={handleCTAClick}
                  >
                    <h3 className="text-[28px] font-light mb-4">{sponsorCTA.title}</h3>
                    <p className="mb-6">{sponsorCTA.description}</p>
                    <button className="bg-paper text-ink px-8 py-2 rounded-pill">
                      Book a call
                    </button>
                  </div>
                ) : (
                  // Regular Event Tile
                  <div 
                    key={item.id}
                    className="event-tile relative cursor-pointer transition-transform hover:translate-y-[-8px]"
                    style={{ 
                      paddingBottom: `${(item.height / item.width) * 100}%`,
                      backgroundColor: 'var(--graphite-60)'
                    }}
                    onClick={() => item.videoUrl ? openModal(item) : null}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <Image 
                        src={item.previewImage}
                        alt={`${item.title} preview`}
                        className="object-cover"
                        fill
                        sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${100 / columns}vw`}
                      />
                      
                      {item.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="w-14 h-14 border border-paper rounded-full flex items-center justify-center">
                            <span className="text-paper">▶</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                        <h3 className="text-[28px] font-light text-paper">{item.title}</h3>
                        <p className="text-graphite-40">{item.date}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Video Lightbox Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="relative bg-ink max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-paper bg-ink bg-opacity-50 rounded-full"
              onClick={closeModal}
              aria-label="Close video"
            >
              ×
            </button>
            
            {videoError ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="text-paper mb-4">Sorry, this video cannot be played.</p>
                <button 
                  className="bg-paper text-ink px-6 py-2 rounded-pill"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedEvent.videoUrl}
                  className="w-full h-full"
                  controls
                  autoPlay
                  onError={handleVideoError}
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-[28px] font-light text-paper mb-2">{selectedEvent.title}</h3>
              <p className="text-graphite-40">{selectedEvent.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 