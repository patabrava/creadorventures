'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FundingFormSchema, type FundingFormData } from '@/core/email-queue';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

// Define typesafe analytics function
type TrackEventFunction = (eventName: string, params?: Record<string, string | boolean | number>) => void;

// Safely import analytics to prevent circular references
let trackEvent: TrackEventFunction | undefined;

// Safely handle analytics import with error handling
const safeTrackEvent = (eventName: string, params?: Record<string, string | boolean | number>) => {
  try {
    if (!trackEvent) {
      // Import analytics only if needed and not already imported
      // Use dynamic import instead of require
      import('@/core/analytics').then((analytics) => {
        trackEvent = analytics.trackEvent as TrackEventFunction;
        
        // Call the track event after import
        if (trackEvent && params) {
          trackEvent(eventName, params);
        }
      }).catch(err => {
        console.warn('Failed to import analytics:', err);
      });
      return; // Return early since we'll call trackEvent in the import promise
    }
    
    // Call the track event with safely typed parameters
    trackEvent(eventName, params);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
    // Continue execution - don't let analytics failures break the app
  }
};

export default function FundingForm() {
  const { ref, isVisible } = useAnimatedVisibility();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // Setup react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FundingFormData>({
    resolver: zodResolver(FundingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      deckUrl: ''
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: FundingFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log success response
      const response = {
        success: true,
        message: 'Funding application received. We will contact you soon.'
      };
      
      // Track the event with GA4 - using our safe tracking function
      safeTrackEvent('funding_apply_submit', {
        company: data.company,
        has_deck: Boolean(data.deckUrl)
      });
      
      // Update UI
      setSubmitResponse(response);
      
      // Reset form fields
      reset();
    } catch (error) {
      // Handle error case
      console.error('Form submission error:', error);
      setSubmitResponse({
        success: false,
        message: 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clean up any potential memory issues on component unmount
  useEffect(() => {
    return () => {
      // Release any resources that might cause memory leaks
      trackEvent = undefined;
    };
  }, []);

  // Style constants for consistent form elements
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: 'var(--font-size-md)',
    fontWeight: 400,
    textAlign: 'left' as const
  };
  
  return (
    <section 
      ref={ref}
      className={`form-section ${isVisible ? 'visible' : ''}`}
      style={{
        padding: 'var(--space-xxl) var(--space-lg)',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <h2 style={{
        fontWeight: 300,
        fontSize: 'var(--font-size-xl)',
        lineHeight: 1.1,
        marginBottom: 'var(--space-xl)',
        textAlign: 'center'
      }}>
        Apply for Funding
      </h2>
      
      <div style={{ 
        width: '100%',
        maxWidth: '600px', 
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <p style={{
          textAlign: 'center',
          marginBottom: 'var(--space-xl)'
        }}>
          Send your deck and apply for funding through our streamlined process.
        </p>
        
        {submitResponse ? (
          <div 
            style={{
              textAlign: 'center',
              padding: 'var(--space-xl)',
              backgroundColor: submitResponse.success ? 'rgba(0, 255, 85, 0.1)' : 'rgba(255, 0, 0, 0.1)',
              margin: 'var(--space-xl) auto',
              border: `1px solid ${submitResponse.success ? 'var(--accent-lime)' : 'red'}`
            }}
          >
            <p style={{ marginBottom: 'var(--space-md)' }}>
              {submitResponse.message}
            </p>
            
            <button
              type="button"
              className="pill-button"
              onClick={() => setSubmitResponse(null)}
              style={{ marginTop: 'var(--space-md)' }}
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)', width: '100%' }}>
              <label htmlFor="name" style={labelStyle}>Full Name *</label>
              <input
                id="name"
                type="text"
                className="underline-input"
                placeholder="Enter your full name"
                {...register('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
                style={{ 
                  width: '100%', 
                  display: 'block',
                  boxSizing: 'border-box'
                }}
              />
              {errors.name && (
                <p style={{ 
                  color: 'red', 
                  fontSize: 'var(--font-size-sm)', 
                  marginTop: 'var(--space-xs)'
                }}>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)', width: '100%' }}>
              <label htmlFor="email" style={labelStyle}>Email Address *</label>
              <input
                id="email"
                type="email"
                className="underline-input"
                placeholder="Enter your email address"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                style={{ 
                  width: '100%', 
                  display: 'block',
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && (
                <p style={{ 
                  color: 'red', 
                  fontSize: 'var(--font-size-sm)', 
                  marginTop: 'var(--space-xs)'
                }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)', width: '100%' }}>
              <label htmlFor="company" style={labelStyle}>Company / Project Name *</label>
              <input
                id="company"
                type="text"
                className="underline-input"
                placeholder="Enter your company or project name"
                {...register('company')}
                aria-invalid={errors.company ? 'true' : 'false'}
                style={{ 
                  width: '100%', 
                  display: 'block',
                  boxSizing: 'border-box'
                }}
              />
              {errors.company && (
                <p style={{ 
                  color: 'red', 
                  fontSize: 'var(--font-size-sm)', 
                  marginTop: 'var(--space-xs)'
                }}>
                  {errors.company.message}
                </p>
              )}
            </div>
            
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)', width: '100%' }}>
              <label htmlFor="deckUrl" style={labelStyle}>Deck URL (optional)</label>
              <input
                id="deckUrl"
                type="url"
                className="underline-input"
                placeholder="Enter URL to your pitch deck"
                {...register('deckUrl')}
                aria-invalid={errors.deckUrl ? 'true' : 'false'}
                style={{ 
                  width: '100%', 
                  display: 'block',
                  boxSizing: 'border-box'
                }}
              />
              {errors.deckUrl && (
                <p style={{ 
                  color: 'red', 
                  fontSize: 'var(--font-size-sm)', 
                  marginTop: 'var(--space-xs)'
                }}>
                  {errors.deckUrl.message}
                </p>
              )}
            </div>
            
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)', width: '100%' }}>
              <label htmlFor="message" style={labelStyle}>Additional Information (optional)</label>
              <textarea
                id="message"
                className="underline-input"
                placeholder="Enter any additional information"
                rows={4}
                {...register('message')}
                style={{ 
                  width: '100%', 
                  resize: 'vertical',
                  display: 'block',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <button
                type="submit"
                className="pill-button"
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
} 