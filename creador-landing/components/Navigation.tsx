'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationLink {
  id: string;
  label: string;
  href?: string;
}

const navLinks: NavigationLink[] = [
  { id: 'hero', label: 'Home', href: '/' },
  { id: 'verticals', label: 'Verticals', href: '/#verticals' },
  { id: 'reports', label: 'Reports', href: '/reports' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'apply', label: 'Apply', href: '/apply' },
  // Other sections will be added in future phases
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Trap focus within the overlay when it's open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      // Handle Escape key to close menu
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
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
        aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        aria-expanded={isMenuOpen}
        className="navbar-toggle"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--paper)',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 100,
          position: 'relative'
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
        className="nav-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform var(--transition-medium)',
          display: 'flex',
          flexDirection: 'row', // Important: horizontal split per style guide
          visibility: isMenuOpen ? 'visible' : 'hidden'
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* Left panel (45%) - Navigation links */}
        <div style={{
          width: '45%',
          height: '100%',
          backgroundColor: 'var(--paper)',
          color: 'var(--ink)',
          padding: 'var(--space-xxl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <nav style={{
            position: 'static',
            width: 'auto',
            height: 'auto',
            background: 'none',
            color: 'var(--ink)',
            padding: 0
          }}>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {navLinks.map((link) => (
                <li key={link.id} style={{
                  marginBottom: 'var(--space-lg)'
                }}>
                  {link.href ? (
                    <Link 
                      href={link.href}
                      onClick={closeMenu}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 300,
                        lineHeight: 1.15,
                        transition: 'var(--transition-fast)',
                        display: 'block'
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
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
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 300,
                        lineHeight: 1.15,
                        transition: 'var(--transition-fast)',
                        display: 'block'
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

        {/* Right panel (55%) - Contact & Promo with dark background */}
        <div style={{
          width: '55%',
          height: '100%',
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          padding: 'var(--space-xxl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-xxl)',
            fontWeight: 300,
            marginBottom: 'var(--space-xl)',
            maxWidth: '480px'
          }}>
            Ready to explore overlooked opportunities?
          </h2>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            marginBottom: 'var(--space-xl)',
            maxWidth: '480px',
            lineHeight: 1.5
          }}>
          </p>
          <a 
            href="mailto:contact@creadorventures.com"
            className="pill-button"
            style={{
              backgroundColor: 'var(--paper)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: '999px',
              padding: '4px 16px',
              fontSize: '16px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'var(--transition-fast)',
              textDecoration: 'none',
              width: 'fit-content',
              maxWidth: '200px'
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