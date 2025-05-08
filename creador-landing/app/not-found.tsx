import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem' }}>We couldn't find the page you were looking for.</p>
      <Link 
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 400
        }}
      >
        Return Home
      </Link>
    </div>
  );
} 