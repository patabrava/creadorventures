import { env } from './env';

// Define the GA4 event types from the PRD
export type GA4EventType = 
  | 'cta_click' 
  | 'funding_apply_submit' 
  | 'calendly_call_booked' 
  | 'sponsor_call_booked' 
  | 'report_download'
  | 'event_video_open'
  | 'event_video_error'
  | 'team_social_click';

// Define function type for gtag
type GtagFunction = (
  command: string,
  action: string,
  params?: Record<string, unknown>
) => void;

// Add types for the global variables
declare global {
  interface Window {
    dataLayer: any[];
    gtag: GtagFunction;
  }
}

/**
 * Track an event with Google Analytics 4
 * Falls back gracefully with console logging if GA4 is not available
 */
export function trackEvent(
  eventName: GA4EventType,
  eventParams: Record<string, unknown> = {}
): void {
  try {
    // Check if gtag is available (it may not be in SSR, development or if blocked)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
      
      // Log successful tracking for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`📈 GA4 event tracked: ${eventName}`, eventParams);
      }
      
      // Log structured event - importing logger dynamically to avoid circular dependencies
      const { default: logger } = require('./logger');
      logger.info({
        layer: 'analytics',
        event: eventName,
        params: eventParams
      }, 'GA4 event tracked');
    } else {
      // Log fallback for missing GA4
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 [GA4 Mock] Event: ${eventName}`, eventParams);
      }
    }
  } catch (error) {
    // Log error with structured context - importing logger dynamically to avoid circular dependencies
    try {
      const { default: logger } = require('./logger');
      logger.error({
        layer: 'analytics',
        event: eventName,
        error: error instanceof Error ? error.message : String(error),
      }, 'Failed to track GA4 event');
    } catch (logError) {
      // Fallback if logger import fails
      console.error('Failed to track GA4 event:', error);
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('GA4 tracking failed:', error);
    }
  }
}

/**
 * Initialize Google Analytics 4
 * Call this function in the application layout
 */
export function initGA4(): void {
  try {
    const measurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    
    // Only initialize if a measurement ID is provided
    if (!measurementId) {
      if (process.env.NODE_ENV === 'development') {
        console.log('GA4 initialization skipped (no measurement ID)');
      }
      return;
    }
    
    // Skip initialization if window is not available (SSR)
    if (typeof window === 'undefined') return;
    
    // Inject GA4 script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Setup dataLayer array if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Define and attach the gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    // Assign gtag function to window
    window.gtag = function(command, action, params) {
      gtag(command, action, params);
    };
    
    // Initialize GA4
    window.gtag('js', new Date().toISOString());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
    
    // Log successful initialization - importing logger dynamically to avoid circular dependencies
    try {
      const { default: logger } = require('./logger');
      logger.info({
        layer: 'analytics',
        measurement_id: measurementId
      }, 'GA4 initialized');
    } catch (logError) {
      // Fallback if logger import fails
      console.log('GA4 initialized successfully');
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📈 GA4 initialized with ID: ${measurementId}`);
    }
  } catch (error) {
    // Log error with structured context - importing logger dynamically to avoid circular dependencies
    try {
      const { default: logger } = require('./logger');
      logger.error({
        layer: 'analytics',
        error: error instanceof Error ? error.message : String(error),
      }, 'Failed to initialize GA4');
    } catch (logError) {
      // Fallback if logger import fails
      console.error('Failed to initialize GA4:', error);
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('GA4 initialization failed:', error);
    }
  }
} 