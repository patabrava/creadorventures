import { z } from 'zod';

// Define environment variable schema using Zod
const envSchema = z.object({
  // Required environment variables with fallbacks for development
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Optional environment variables with defaults
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  CALENDLY_BASE_URL: z.string().default('https://calendly.com'),
});

// Helper function for logging errors without direct imports
const logError = (message: string) => {
  try {
    // Dynamically import logger to avoid circular dependencies
    const { default: logger } = require('./logger');
    logger.error({ layer: 'env', error: message });
  } catch (err) {
    // Fallback if logger import fails
    console.error(message);
  }
};

// Parse and validate environment variables
const parseEnv = () => {
  try {
    // Use spread syntax to ensure process.env values take precedence
    const mergedEnv = {
      ...process.env
    };
    
    // Ensure NODE_ENV has a default value if not set
    if (!mergedEnv.NODE_ENV) {
      mergedEnv.NODE_ENV = 'development';
    }
    
    return envSchema.parse(mergedEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Environment validation failed: ${error.errors.map(e => `${e.path}: ${e.message}`).join(', ')}`;
      logError(errorMessage);
      
      // In development, we want to immediately see the error
      if (process.env.NODE_ENV === 'development') {
        console.error('\n🚫 Invalid environment variables:', error.errors);
      }
      
      // Instead of throwing, use fallback values
      console.warn('Using fallback environment values due to validation errors');
      return envSchema.parse({
        NODE_ENV: 'development',
        NEXT_PUBLIC_GA_MEASUREMENT_ID: '',
        CALENDLY_BASE_URL: 'https://calendly.com'
      });
    }
    
    // For unexpected errors, still provide fallback values
    console.error('Unexpected error validating environment:', error);
    return envSchema.parse({
      NODE_ENV: 'development',
      NEXT_PUBLIC_GA_MEASUREMENT_ID: '',
      CALENDLY_BASE_URL: 'https://calendly.com'
    });
  }
};

// Export validated environment variables
export const env = parseEnv();

// Type definition for validated env
export type Env = z.infer<typeof envSchema>;

export default env; 