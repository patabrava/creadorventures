'use client';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  isPlaying: boolean;
  onEnd: () => void;
  onError: () => void;
}

export interface VideoPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  isPaused: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  load: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ videoSrc, posterSrc, isPlaying, onEnd, onError }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          return videoRef.current.play();
        }
        return Promise.reject(new Error('Video element not available'));
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      isPaused: () => {
        return videoRef.current ? videoRef.current.paused : true;
      },
      getCurrentTime: () => {
        return videoRef.current ? videoRef.current.currentTime : 0;
      },
      getDuration: () => {
        return videoRef.current ? videoRef.current.duration : 0;
      },
      load: () => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }
    }));

    // Handle play/pause based on isPlaying prop
    useEffect(() => {
      if (!videoRef.current) return;
      
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
          onError();
        });
      } else {
        videoRef.current.pause();
      }
    }, [isPlaying, onError]);

    return (
      <video 
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isPlaying ? 1 : 0.5,
          transition: 'opacity var(--transition-medium)'
        }}
        poster={posterSrc}
        preload="none"
        onEnded={onEnd}
        onError={onError}
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Provide multiple formats for cross-browser compatibility */}
        {videoSrc.endsWith('.mp4') && (
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        )}
        <p>Your browser does not support HTML5 video.</p>
      </video>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer; 