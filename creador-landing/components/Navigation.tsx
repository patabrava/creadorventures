'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

const navLinks: NavigationLink[] = [
  { id: 'hero', label: 'Home', href: '/' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'apply', label: 'Apply', href: '/apply' },
  // Other sections will be added in future phases
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Trap focus within the overlay when it's open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      // Focus first link when menu opens
      setTimeout(() => {
        if (firstLinkRef.current) {
          firstLinkRef.current.focus();
        }
      }, 100);
      
      // Handle Escape key to close menu
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      
      // Handle focus trap
      const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        
        const focusableElements = overlayRef.current?.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        if (!focusableElements?.length) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        // Shift + Tab on first element => focus last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } 
        // Tab on last element => focus first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('keydown', handleFocusTrap);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
        window.removeEventListener('keydown', handleFocusTrap);
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button - Neo-Brutalist minimalist hamburger */}
      <button 
        ref={closeButtonRef}
        aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        aria-expanded={isMenuOpen}
        className="navbar-toggle"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--paper)',
          fontSize: isMobile ? '20px' : '24px',
          cursor: 'pointer',
          zIndex: 100,
          position: 'relative',
          padding: isMobile ? '8px' : '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={toggleMenu}
      >
        <span style={{
          transition: 'var(--transition-fast)',
          transform: isMenuOpen ? 'rotate(90deg)' : 'none',
          display: 'inline-block'
        }}>
          {isMenuOpen ? '×' : '= ='}
        </span>
      </button>

      {/* Fullscreen overlay menu following style guide specs */}
      <div 
        ref={overlayRef}
        className="nav-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform var(--transition-medium)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          visibility: isMenuOpen ? 'visible' : 'hidden'
        }}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nav-overlay-title"
      >
        {/* Left panel (45% on desktop, 100% width/50% height on mobile) - Navigation links */}
        <div style={{
          width: isMobile ? '100%' : '45%',
          height: isMobile ? '50%' : '100%',
          backgroundColor: 'var(--paper)',
          color: 'var(--ink)',
          padding: isMobile ? 'var(--space-lg)' : 'var(--space-xxl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto'
        }}>
          <nav style={{
            position: 'static',
            width: 'auto',
            height: 'auto',
            background: 'none',
            color: 'var(--ink)',
            padding: 0
          }}>
            {/* Hidden visually but kept for screen readers */}
            <h2 
              id="nav-overlay-title"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                borderWidth: 0
              }}
            >
              Navigation
            </h2>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {navLinks.map((link, index) => (
                <li key={link.id} style={{
                  marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)'
                }}>
                  {link.href ? (
                    <Link 
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: isMobile ? '28px' : 'var(--font-size-lg)',
                        fontWeight: 300,
                        lineHeight: 1.15,
                        transition: 'var(--transition-fast)',
                        display: 'block',
                        padding: '4px 0'
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(link.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                        closeMenu();
                      }}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: isMobile ? '28px' : 'var(--font-size-lg)',
                        fontWeight: 300,
                        lineHeight: 1.15,
                        transition: 'var(--transition-fast)',
                        display: 'block',
                        padding: '4px 0'
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right panel (55% on desktop, 100% width/50% height on mobile) - Contact & Promo with dark background */}
        <div style={{
          width: isMobile ? '100%' : '55%',
          height: isMobile ? '50%' : '100%',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          padding: isMobile ? 'var(--space-lg)' : 'var(--space-xxl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : 'var(--font-size-xxl)',
            fontWeight: 300,
            marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-xl)',
            maxWidth: '480px'
          }}>
            Ready to explore overlooked opportunities?
          </h2>
          <p style={{
            fontSize: isMobile ? '18px' : 'var(--font-size-lg)',
            marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-xl)',
            maxWidth: '480px',
            lineHeight: 1.5
          }}>
            We're here to help you navigate the future of innovation.
          </p>
          <a 
            href="mailto:contact@creadorventures.com"
            className="pill-button"
            style={{
              backgroundColor: 'var(--paper)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: '999px',
              padding: isMobile ? '8px 24px' : '12px 32px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'var(--transition-fast)',
              textDecoration: 'none',
              width: 'fit-content',
              maxWidth: isMobile ? '180px' : '200px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}