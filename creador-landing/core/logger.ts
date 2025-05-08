import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';
const isNode = typeof window === 'undefined';

// Configure pino logger with appropriate options
const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  transport: isDevelopment && isNode
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  base: {
    env: process.env.NODE_ENV,
  },
});

// Log standard information about the request
export const logRequest = (
  route: string,
  method: string,
  statusCode: number,
  responseTimeMs: number
) => {
  logger.info({
    layer: 'api',
    route,
    method,
    statusCode,
    responseTimeMs,
  });
};

// Log errors with appropriate context
export const logError = (
  layer: string,
  route: string | undefined,
  error: Error,
  context?: Record<string, unknown>
) => {
  logger.error({
    layer,
    route,
    error: {
      message: error.message,
      stack: error.stack,
    },
    ...context,
  });
};

export default logger; 