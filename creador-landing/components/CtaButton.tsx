'use client';

import { MouseEvent } from 'react';

type CtaButtonVariant = 'dark' | 'light';
type CtaButtonSize = 'default' | 'large';

interface CtaButtonProps {
  children: React.ReactNode;
  variant?: CtaButtonVariant;
  size?: CtaButtonSize;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * Neo-brutalist CTA button component with dark/light variants
 * Follows the STYLE_GUIDE pill button design with arrow icon
 */
export default function CtaButton({
  children,
  variant = 'dark',
  size = 'default',
  onClick,
  className = '',
  ariaLabel,
  type = 'button',
  disabled = false
}: CtaButtonProps) {
  // Define style variations based on variant
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '999px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 300,
    transition: 'var(--transition-fast)',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    // No need for extra paddingLeft since CSS handles the arrow spacing
  } as const;

  // Calculate size-dependent styles
  const sizeStyles = size === 'large' 
    ? { padding: '16px 40px', fontSize: '20px' } 
    : { padding: '12px 32px', fontSize: '18px' };

  // Calculate variant-dependent styles
  const variantStyles = variant === 'dark'
    ? { 
        backgroundColor: 'var(--paper)', 
        color: 'var(--ink)' 
      }
    : { 
        backgroundColor: 'var(--ink)', 
        color: 'var(--paper)' 
      };

  // Handle click event with potential analytics tracking
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Track CTA click event with GA4 (will implement integration later)
    try {
      // TODO: Add GA4 tracking
      // window.gtag?.('event', 'cta_click', {
      //   cta_text: typeof children === 'string' ? children : 'unknown'
      // });
    } catch (error) {
      console.warn('GA4 tracking failed:', error);
    }
    
    // Execute passed onClick handler
    onClick?.(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`pill-button ${variant} ${className}`}
      style={{
        ...baseStyles,
        ...sizeStyles,
        ...variantStyles,
      }}
    >
      {children}
    </button>
  );
} 