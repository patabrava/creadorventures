'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { trackEvent, GA4EventType } from '@/core/analytics';
import VideoPlayer, { VideoPlayerHandle } from './VideoPlayer';
import VideoError from './VideoError';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  previewImage: string;
  videoUrl?: string;
  vimeoId?: string;
  width: number;
  height: number;
  previewVideoSrc?: string;
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
  const [selectedEventIdForModal, setSelectedEventIdForModal] = useState<string | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [modalVideoError, setModalVideoError] = useState<boolean>(false);
  const [playingPreviewId, setPlayingPreviewId] = useState<string | null>(null);
  const videoPlayerRefs = useRef<Record<string, VideoPlayerHandle | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleOpenModal = (event: EventItem) => {
    if (!event.vimeoId) {
      console.warn("No Vimeo ID for this event, cannot open modal.", event.id);
      if (event.videoUrl) { // Or previewVideoSrc
        const videoToPlayId = event.id;
        if (playingPreviewId === videoToPlayId && videoPlayerRefs.current[videoToPlayId]?.isPaused() === false) {
          videoPlayerRefs.current[videoToPlayId]?.pause();
        } else {
          if (playingPreviewId && playingPreviewId !== videoToPlayId) {
            videoPlayerRefs.current[playingPreviewId]?.pause();
          }
          setPlayingPreviewId(videoToPlayId);
          // Ensure play is called if ref is available
          setTimeout(() => videoPlayerRefs.current[videoToPlayId]?.play(), 0);
        }
      }
      return;
    }
    // Pause any playing preview before opening modal
    if (playingPreviewId && videoPlayerRefs.current[playingPreviewId]) {
        videoPlayerRefs.current[playingPreviewId]?.pause();
        setPlayingPreviewId(null); 
    }
    setIsLoadingModal(true);
    setSelectedEventIdForModal(event.id);
    setModalVideoError(false);
    trackEvent('event_video_modal_open' as GA4EventType, { event_title: event.title, vimeoId: event.vimeoId });
    document.body.style.overflow = 'hidden';
    // Script loading logic for Vimeo player API
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => setIsLoadingModal(false);
      script.onerror = () => {
        setModalVideoError(true);
        setIsLoadingModal(false);
      };
      document.body.appendChild(script);
    } else {
      setIsLoadingModal(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedEventIdForModal(null);
    setModalVideoError(false);
    document.body.style.overflow = '';
  };

  const handleModalVideoError = () => {
    setModalVideoError(true);
    setIsLoadingModal(false);
  };

  const handleCardClick = (event: EventItem) => {
    if (event.vimeoId) { // Always prioritize modal for Vimeo links
      handleOpenModal(event);
    } else if (event.videoUrl || event.previewVideoSrc) { // Handle local video play/pause
      const videoToPlayId = event.id;
      // If a different video is playing, pause it
      if (playingPreviewId && playingPreviewId !== videoToPlayId && videoPlayerRefs.current[playingPreviewId]) {
        videoPlayerRefs.current[playingPreviewId]?.pause();
      }
      
      // Toggle play/pause for the clicked video
      if (playingPreviewId === videoToPlayId) {
        if (videoPlayerRefs.current[videoToPlayId]?.isPaused() === false) {
          videoPlayerRefs.current[videoToPlayId]?.pause();
          // setPlayingPreviewId(null); // Optionally keep it as current if paused
        } else {
          videoPlayerRefs.current[videoToPlayId]?.play();
          setPlayingPreviewId(videoToPlayId); // Ensure it's set if playing
        }
      } else { // Play new video
        setPlayingPreviewId(videoToPlayId);
        // Ensure play is called if ref is available and component is mounted
        setTimeout(() => videoPlayerRefs.current[videoToPlayId]?.play(), 0);
      }
      trackEvent('event_video_play_inline' as GA4EventType, { event_title: event.title, video_src: event.videoUrl || event.previewVideoSrc });
    }
    // If no vimeoId and no videoUrl/previewVideoSrc, clicking does nothing beyond what CSS provides (e.g. hover effects)
  };

  const getEventById = (id: string | null) => events.find(e => e.id === id) || null;
  const currentModalEvent = getEventById(selectedEventIdForModal);

  return (
    <section 
      id="past-events"
      style={{ backgroundColor: 'black', color: 'white' }} 
      className="py-16 px-6"
    >
      <div className="max-w-[1440px] mx-auto" style={{ backgroundColor: 'black', color: 'white' }}>
        <div className="mb-16 border-b-2 border-white pb-4" style={{ backgroundColor: 'black', color: 'white' }}>
          <h2 className="text-5xl font-light mb-4">Past Events</h2>
          <p className="text-lg max-w-[600px]">
            Explore recordings from our archive of thought-provoking events and discussions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map(event => {
            const isPreviewPlaying = playingPreviewId === event.id;
            const videoSrcForPlayer = event.videoUrl || event.previewVideoSrc;

            return (
              <div 
                key={event.id} 
                className="flex flex-col border-2 border-white mb-8"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                <div 
                  className="relative w-5/6 mx-auto aspect-video overflow-hidden"
                  style={{ backgroundColor: 'black', cursor: (event.vimeoId || videoSrcForPlayer) ? 'pointer' : 'default' }}
                  onClick={() => (event.vimeoId || videoSrcForPlayer) && handleCardClick(event)}
                >
                  {videoSrcForPlayer ? (
                    <div className="w-full h-full">
                      <VideoPlayer
                        ref={(el: VideoPlayerHandle | null) => { videoPlayerRefs.current[event.id] = el; }}
                        videoSrc={videoSrcForPlayer}
                        posterSrc={event.previewImage}
                        isPlaying={isPreviewPlaying}
                        onEnd={() => setPlayingPreviewId(null)}
                        onError={() => {
                            console.error(`Error playing preview for ${event.id}: ${videoSrcForPlayer}`);
                            setPlayingPreviewId(null);
                        }}
                      />
                    </div>
                  ) : (
                    <Image 
                      src={event.previewImage}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => console.error(`Error loading image for ${event.id}: ${event.previewImage}`)}
                      priority={sortedEvents.indexOf(event) < 3}
                    />
                  )}
                </div>
                <div className="p-6 flex-grow" style={{ backgroundColor: 'black', color: 'white' }}>
                  <p className="text-gray-400 mb-2">{event.date}</p>
                  <h3 className="text-2xl font-light mb-0">{event.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 pt-16 border-t-2 border-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-light mb-4">{sponsorCTA.title}</h3>
              <p className="text-lg mb-4">{sponsorCTA.description}</p>
            </div>
            <button 
              onClick={() => onOpenCalendly(
                sponsorCTA.title,
                sponsorCTA.calendlyUrl,
                sponsorCTA.fallbackEmail
              )}
              className="border-2 border-white py-3 px-8 text-lg hover:bg-white hover:text-black"
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
      
      {currentModalEvent && currentModalEvent.vimeoId && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={handleCloseModal}
        >
          <div 
            ref={modalRef}
            className="relative max-w-6xl w-full border-2 border-white bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center text-white text-3xl border-2 border-white bg-black hover:bg-white hover:text-black"
              onClick={handleCloseModal}
              aria-label="Close video"
            >
              ×
            </button>
            {isLoadingModal && (
              <div className="absolute inset-0 flex items-center justify-center z-[70] bg-black">
                <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
              </div>
            )}
            {modalVideoError ? (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <VideoError 
                    message="Sorry, the Vimeo video cannot be played."
                    onRetry={() => {
                        if(currentModalEvent) {
                            setModalVideoError(false);
                            setIsLoadingModal(true);
                            handleOpenModal(currentModalEvent); 
                        }
                    }}
                />
                <button 
                  className="mt-4 border-2 border-white py-3 px-8 hover:bg-white hover:text-black"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="relative" style={{paddingBottom: '56.25%'}}>
                <iframe 
                  src={`https://player.vimeo.com/video/${currentModalEvent.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&transparent=0&background=0`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title={currentModalEvent.title}
                  onLoad={() => setIsLoadingModal(false)}
                  onError={handleModalVideoError}
                />
              </div>
            )}
            <div className="p-8 bg-black">
              <p className="text-gray-400 mb-2">{currentModalEvent.date}</p>
              <h3 className="text-3xl font-light text-white">{currentModalEvent.title}</h3>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
} 