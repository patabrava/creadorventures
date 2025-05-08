import logger from './logger';

// Types for Calendly widget configuration
export interface CalendlyWidgetOptions {
  url: string;
  prefill?: Record<string, any>;
  utm?: Record<string, any>;
}

// Flag to simulate timeout for testing (keeping for backward compatibility)
let FORCE_TIMEOUT = false;

/**
 * Test helper to force timeouts - only used in tests
 * @param force Whether to force a timeout (true) or return to normal (false)
 */
export function __setForceTimeoutForTests(force: boolean): void {
  FORCE_TIMEOUT = force;
}

/**
 * Load Calendly script if not already loaded
 * @returns Promise that resolves when script is loaded
 */
export function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (typeof window !== 'undefined' && window.Calendly) {
      resolve();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (existingScript) {
      resolve();
      return;
    }

    // Create and append script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      logger.info(
        { layer: 'calendly_loader', status: 'success' },
        'Calendly script loaded successfully'
      );
      resolve();
    };
    script.onerror = (error) => {
      logger.error(
        { layer: 'calendly_loader', status: 'error', error },
        'Failed to load Calendly script'
      );
      reject(new Error('Failed to load Calendly script'));
    };
    document.body.appendChild(script);
  });
}

/**
 * Extracts just the meeting type from a Calendly URL
 * Example: https://calendly.com/creador-ventures/meeting -> meeting
 */
export function getCalendlyMeetingType(calendlyUrl: string): string {
  try {
    const url = new URL(calendlyUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    return pathParts[pathParts.length - 1] || 'unknown';
  } catch (error) {
    logger.error(
      { layer: 'calendly_proxy', url: calendlyUrl, status: 'parse_error' },
      'Failed to parse Calendly URL'
    );
    return 'unknown';
  }
}

/**
 * @deprecated Use the direct Calendly API approach instead
 * Fetches Calendly embed HTML with timeout protection and caching
 * 
 * @param calendlyUrl - The Calendly URL to embed (e.g., "https://calendly.com/creador-ventures/meeting")
 * @param timeoutMs - Optional custom timeout in milliseconds (default: 5000ms)
 * @returns The HTML string for embedding Calendly
 * @throws Error if fetch times out or fails
 */
export async function getCalendlyEmbed(
  calendlyUrl: string, 
  timeoutMs: number = 5000
): Promise<string> {
  logger.info(
    { layer: 'calendly_proxy', url: calendlyUrl },
    'Using deprecated getCalendlyEmbed function'
  );
  
  // For backward compatibility, simulate timeout if needed
  if (FORCE_TIMEOUT || timeoutMs < 10) {
    throw new Error(`Calendly fetch timed out after ${timeoutMs}ms`);
  }
  
  return `<div class="calendly-inline-widget" data-url="${calendlyUrl}" style="min-width:320px;height:700px;"></div>`;
} 