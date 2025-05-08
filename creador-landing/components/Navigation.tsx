'use client';

import { useState, useEffect } from 'react';

interface NavigationLink {
  id: string;
  label: string;
}

const navLinks: NavigationLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'verticals', label: 'Verticals' },
  // Other sections will be added in future phases
  // { id: 'portfolio', label: 'Portfolio' },
  // { id: 'reports', label: 'Reports' },
  // { id: 'events', label: 'Events' },
  // { id: 'team', label: 'Team' },
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
          <div style={{
            maxWidth: '580px'
          }}>
            <h2 style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 'var(--space-lg)'
            }}>
              Get in touch
            </h2>
            
            <a 
              href="mailto:biz@creador.vc" 
              style={{
                fontSize: 'var(--font-size-xxl)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--paper)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: 'var(--space-xl)',
                transition: 'var(--transition-fast)'
              }}
            >
              biz@creador.vc
            </a>
            
            <div style={{
              borderTop: '1px solid var(--graphite-40)',
              paddingTop: 'var(--space-lg)'
            }}>
              <p style={{
                fontSize: 'var(--font-size-md)',
                lineHeight: '28px',
                marginBottom: 'var(--space-md)'
              }}>
                Building value where others overlook.
              </p>
              
              <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--graphite-40)'
              }}>
                Bogotá · Miami · Remote
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 