import { z } from 'zod';

// Schema for funding application form data
export const FundingFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(1, 'Company name is required'),
  message: z.string().optional(),
  deckUrl: z.string().url('Valid URL is required').optional().or(z.string().length(0)),
});

// Schema for collaboration form data
export const CollaborateFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().min(1, 'Organization is required'),
  projectType: z.string().min(1, 'Project type is required'),
  message: z.string().optional(),
});

// Types inferred from schemas
export type FundingFormData = z.infer<typeof FundingFormSchema>;
export type CollaborateFormData = z.infer<typeof CollaborateFormSchema>;

// Helper function to log without direct imports
const logInfo = (data: any, message: string) => {
  try {
    const { default: logger } = require('./logger');
    logger.info(data, message);
  } catch (error) {
    console.log(message, data);
  }
};

const logError = (data: any, message: string) => {
  try {
    const { default: logger } = require('./logger');
    logger.error(data, message);
  } catch (error) {
    console.error(message, data);
  }
};

/**
 * Sends funding application email
 * In production, this would connect to an actual email service like Resend or SendGrid
 */
export async function queueFundingEmail(data: FundingFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate data with Zod schema
    FundingFormSchema.parse(data);
    
    // Log structured event
    logInfo({
      layer: 'email_queue',
      action: 'funding_application',
      recipient: data.email,
      company: data.company,
      has_deck: Boolean(data.deckUrl)
    }, 'Funding application received');

    // In a real implementation, this would send via an email API
    // For now, we'll simulate a successful API call
    
    // This would be replaced with actual API call in production
    // e.g., await resendClient.send({ to: data.email, ... })
    
    return { 
      success: true, 
      message: 'Funding application received. We will contact you soon.'
    };
  } catch (error) {
    // Log error with structured context
    logError({
      layer: 'email_queue',
      action: 'funding_application_failed',
      error: error instanceof Error ? error.message : String(error),
    }, 'Failed to process funding application');
    
    // Store in Vercel KV as fallback (pseudo-code)
    // await storeFailedSubmission('funding', data);
    
    return { 
      success: false, 
      message: 'Could not process your application. Please try again or contact us directly.'
    };
  }
}

/**
 * Sends collaboration request email
 * In production, this would connect to an actual email service
 */
export async function queueCollaborateEmail(data: CollaborateFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate data with Zod schema
    CollaborateFormSchema.parse(data);
    
    // Log structured event
    logInfo({
      layer: 'email_queue',
      action: 'collaboration_request',
      recipient: data.email,
      organization: data.organization,
      project_type: data.projectType
    }, 'Collaboration request received');

    // In a real implementation, this would send via an email API
    // For now, we'll simulate a successful API call
    
    return { 
      success: true, 
      message: 'Collaboration request received. We will contact you soon.'
    };
  } catch (error) {
    // Log error with structured context
    logError({
      layer: 'email_queue',
      action: 'collaboration_request_failed',
      error: error instanceof Error ? error.message : String(error),
    }, 'Failed to process collaboration request');
    
    // Store in Vercel KV as fallback (pseudo-code)
    // await storeFailedSubmission('collaborate', data);
    
    return { 
      success: false, 
      message: 'Could not process your request. Please try again or contact us directly.'
    };
  }
}

/**
 * Adds an email to the mailing list queue
 */
export async function queueMailingListSignup(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Basic validation
    if (!email || !email.includes('@')) {
      throw new Error('Valid email is required');
    }
    
    // Log structured event
    logInfo({
      layer: 'email_queue',
      action: 'mailing_list_signup',
      email
    }, 'Mailing list signup');

    // In a real implementation, this would add to a mailing list provider
    // For now, we'll simulate a successful API call
    
    return { 
      success: true, 
      message: 'You have been added to our mailing list.'
    };
  } catch (error) {
    // Log error with structured context
    logError({
      layer: 'email_queue',
      action: 'mailing_list_signup_failed',
      error: error instanceof Error ? error.message : String(error),
    }, 'Failed to add to mailing list');
    
    return { 
      success: false, 
      message: 'Could not add you to our mailing list. Please try again.'
    };
  }
} 