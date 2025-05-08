import { z } from 'zod';
import logger from './logger';

// Define environment variable schema using Zod
const envSchema = z.object({
  // Required environment variables
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // Optional environment variables with defaults
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  CALENDLY_BASE_URL: z.string().default('https://calendly.com'),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Environment validation failed: ${error.errors.map(e => `${e.path}: ${e.message}`).join(', ')}`;
      logger.error({ layer: 'env', error: errorMessage });
      
      // In development, we want to immediately see the error
      if (process.env.NODE_ENV === 'development') {
        console.error('\n🚫 Invalid environment variables:', error.errors);
      }
      
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

// Export validated environment variables
export const env = parseEnv();

// Type definition for validated env
export type Env = z.infer<typeof envSchema>;

export default env; 