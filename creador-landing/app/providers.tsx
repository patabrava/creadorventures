'use client';

import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

// SafeWorkers init - imported dynamically to avoid SSR issues
const initSafeWorkers = () => {
  if (typeof window !== 'undefined') {
    // Import only on client-side
    import('@/core/safeWorkers').then(({ initSafeWorkers }) => {
      initSafeWorkers();
    }).catch(error => {
      console.warn('Failed to initialize safe workers:', error);
    });
  }
};

// Define types for window and process extensions
interface ExtendedWindow extends Window {
  process?: {
    env?: {
      NODE_ENV?: string;
    };
  };
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize safe workers on client-side
    initSafeWorkers();
    
    // Set NODE_ENV dynamically if it's missing
    if (process.env.NODE_ENV === undefined) {
      // This is for client-side only
      const win = window as ExtendedWindow;
      win.process = win.process || {};
      win.process.env = win.process.env || {};
      win.process.env.NODE_ENV = 'development';
    }
  }, []);
  
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
} 