'use client';

interface VideoErrorProps {
  onRetry: () => void;
  message?: string;
}

export default function VideoError({ 
  onRetry, 
  message = 'Sorry, there was an error playing the video.' 
}: VideoErrorProps) {
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10
      }}
    >
      <p 
        style={{
          fontSize: 'var(--font-size-md)',
          color: 'var(--paper)',
          marginBottom: 'var(--space-md)',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          backgroundColor: 'var(--paper)',
          color: 'var(--ink)',
          border: 'none',
          borderRadius: '999px',
          padding: '12px 32px',
          fontSize: 'var(--font-size-md)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Try Again
      </button>
    </div>
  );
} 