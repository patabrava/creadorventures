'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div 
          style={{ 
            padding: '20px', 
            margin: '20px auto', 
            maxWidth: '600px',
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--accent-rose)',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h2 style={{ color: 'var(--accent-rose)' }}>Something went wrong</h2>
          <p>We&apos;re sorry, but there was an error loading this component.</p>
          <details style={{ marginTop: '15px', cursor: 'pointer' }}>
            <summary>Error details (for developers)</summary>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              overflow: 'auto',
              marginTop: '10px',
              fontSize: '14px',
              color: '#e63946'
            }}>
              {this.state.error?.toString() || 'Unknown error'}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              backgroundColor: 'var(--accent-rose)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
} 