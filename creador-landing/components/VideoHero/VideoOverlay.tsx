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
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
    >
      <h2 
        style={{
          fontWeight: 300,
          fontSize: 'var(--font-size-xxl)',
          color: 'var(--paper)',
          marginBottom: 'var(--space-md)',
          textAlign: 'center'
        }}
      >
        Play reel
      </h2>
      <button
        onClick={onPlayClick}
        disabled={isLoading}
        aria-label="Play video"
        style={{
          width: '56px',
          height: '56px',
          border: '1px solid var(--paper)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'border-width 0.3s',
          background: 'transparent',
          color: 'var(--paper)',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderWidth = '2px';
          if (e.currentTarget.children[0]) {
            (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1.1)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderWidth = '1px';
          if (e.currentTarget.children[0]) {
            (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1)';
          }
        }}
        onFocus={(e) => e.currentTarget.style.borderWidth = '2px'}
        onBlur={(e) => e.currentTarget.style.borderWidth = '1px'}
      >
        <span 
          style={{
            fontSize: '24px',
            transition: 'transform 0.3s'
          }}
        >
          {isLoading ? '⏳' : '▶'}
        </span>
      </button>
    </div>
  );
} 