'use client';

interface VideoOverlayProps {
  isPlaying: boolean;
  onPlayClick: () => void;
}

export default function VideoOverlay({ isPlaying, onPlayClick }: VideoOverlayProps) {
  return (
    <div 
      onClick={onPlayClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isPlaying ? 0 : 1,
        transition: 'opacity var(--transition-medium)',
        pointerEvents: isPlaying ? 'none' : 'auto',
        cursor: 'pointer'
      }}
    />
  );
} 