'use client';

import { useEffect, useState, useRef } from 'react';
import { loadCalendlyScript } from '@/core/calendly';

// Type definition for window.Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
      }) => void;
    };
  }
}

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl: string;
  fallbackEmail: string;
  title: string;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  calendlyUrl,
  fallbackEmail,
  title
}: CalendlyModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  
  // Load Calendly script and initialize widget
  useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    
    // Function to initialize the widget
    const initializeCalendly = () => {
      if (!isMounted) return;
      
      if (window.Calendly && calendlyContainerRef.current) {
        try {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            if (!isMounted) return;
            
            if (window.Calendly && calendlyContainerRef.current) {
              window.Calendly.initInlineWidget({
                url: calendlyUrl,
                parentElement: calendlyContainerRef.current,
                prefill: {}
              });
              setIsLoading(false);
            }
          }, 100);
        } catch (err) {
          console.error('Failed to initialize Calendly widget:', err);
          if (isMounted) {
            setError('Unable to load scheduling widget.');
            setIsLoading(false);
          }
        }
      }
    };
    
    // Load the Calendly script and initialize
    loadCalendlyScript()
      .then(() => {
        if (isMounted) {
          setTimeout(() => initializeCalendly(), 200);
        }
      })
      .catch((err) => {
        console.error('Failed to load Calendly script:', err);
        if (isMounted) {
          setError('Failed to load scheduling widget.');
          setIsLoading(false);
        }
      });
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (calendlyContainerRef.current) {
        // Clear the container if needed
        calendlyContainerRef.current.innerHTML = '';
      }
    };
  }, [isOpen, calendlyUrl]);

  // Trap focus within modal when open
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Handle tab key to trap focus
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // If shift + tab and on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If tab and on last element, move to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Handle escape key to close modal
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    // Focus first element when modal opens
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length) {
      (focusableElements[0] as HTMLElement).focus();
    }

    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="calendly-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="calendly-modal-content"
        style={{
          backgroundColor: 'var(--paper)',
          color: 'var(--ink)',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '32px',
          borderRadius: '4px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            transition: 'var(--transition-fast)'
          }}
        >
          ×
        </button>

        <h2 
          id="modal-title"
          style={{
            fontSize: '32px',
            fontWeight: 300,
            marginBottom: '24px'
          }}
        >
          {title}
        </h2>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Loading scheduler...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>{error}</p>
            <div style={{ marginTop: '32px' }}>
              <p>Please contact us directly at:</p>
              <a
                href={`mailto:${fallbackEmail}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  fontSize: '18px',
                  padding: '8px 0',
                  position: 'relative',
                  marginTop: '8px',
                  fontWeight: 500
                }}
              >
                <span style={{ marginRight: '8px' }}>→</span>
                {fallbackEmail}
              </a>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <div 
            ref={calendlyContainerRef}
            className="calendly-inline-widget" 
            data-url={calendlyUrl}
            style={{ 
              minHeight: '700px', 
              width: '100%' 
            }}
          />
        )}
      </div>
    </div>
  );
} 