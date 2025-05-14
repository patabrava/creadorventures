'use client';

import { useEffect, useState, useRef } from 'react';
import useMousePosition from '@/hooks/useMousePosition';

interface CustomCursorProps {
  isVisible: boolean;
  onClick?: () => void;
}

export default function CustomCursor({ isVisible, onClick }: CustomCursorProps) {
  const { x, y } = useMousePosition();
  const [isMounted, setIsMounted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  // Use refs for smoother animations
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Smooth cursor movement with lerp (linear interpolation)
  useEffect(() => {
    if (!isMounted || !cursorRef.current) return;
    
    let animationFrameId: number;
    let currentX = x;
    let currentY = y;
    
    const animate = () => {
      if (!cursorRef.current) return;
      
      // Smooth movement with lerp
      currentX = currentX + (x - currentX) * 0.15;
      currentY = currentY + (y - currentY) * 0.15;
      
      cursorRef.current.style.left = `${currentX}px`;
      cursorRef.current.style.top = `${currentY}px`;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted, x, y]);

  // Only show cursor after component is mounted (prevents flashing on page load)
  useEffect(() => {
    setIsMounted(true);
    
    // Add mouse down/up event listeners for click animation
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => {
      setIsPressed(false);
      // If cursor is visible and click was within the cursor area, trigger the onClick callback
      if (isVisible && onClick) {
        onClick();
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      setIsMounted(false);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible, onClick]);

  // Don't render on server side
  if (!isMounted) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isPressed ? 'pressed' : ''}`}
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        width: isPressed ? '70px' : '80px',
        height: isPressed ? '70px' : '80px',
        borderRadius: '50%',
        border: `2px solid ${isPressed ? 'var(--accent-lime, #00FF55)' : 'var(--paper)'}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isPressed ? 'rgba(0, 255, 85, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <span
        style={{
          fontSize: '32px',
          color: isPressed ? 'var(--accent-lime, #00FF55)' : 'var(--paper)',
          transform: isPressed ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.2s ease, color 0.2s ease',
        }}
      >
        ▶
      </span>
    </div>
  );
} 