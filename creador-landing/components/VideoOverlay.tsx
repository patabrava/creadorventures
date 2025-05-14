'use client';

interface VideoOverlayProps {
  isPlaying: boolean;
  isLoading: boolean;
  onPlayClick: () => void;
}

export default function VideoOverlay({ isPlaying, isLoading, onPlayClick }: VideoOverlayProps) {
  return (
    <div 
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
        backgroundColor: 'rgba(221, 130, 101, 0.5)'
      }}
    >
      <h1 
        style={{
          fontWeight: 300,
          fontSize: 'clamp(56px, 8vw, 120px)',
          color: 'var(--paper)',
          marginBottom: 'var(--space-md)',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: 1.05
        }}
      >
        Play reel
      </h1>
      <button
        onClick={onPlayClick}
        disabled={isLoading}
        aria-label="Play video"
        style={{
          width: '80px',
          height: '80px',
          border: '2px solid var(--paper)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s, border-width 0.3s',
          background: 'transparent',
          color: 'var(--paper)',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.borderWidth = '3px';
          if (e.currentTarget.children[0]) {
            (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1.1)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderWidth = '2px';
          if (e.currentTarget.children[0]) {
            (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1)';
          }
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.borderWidth = '3px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderWidth = '2px';
        }}
      >
        <span 
          style={{
            fontSize: '32px',
            transition: 'transform 0.3s'
          }}
        >
          {isLoading ? '⏳' : '▶'}
        </span>
      </button>
    </div>
  );
} 