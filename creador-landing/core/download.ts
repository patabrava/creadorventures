import { ReadableStream } from 'stream/web';
import logger from './logger';
import { trackEvent } from './analytics';

type DownloadOptions = {
  filePath: string;
  fileName: string;
  reportName: string;
  mimeType?: string;
};

/**
 * Creates a streaming response for downloading files like reports
 * Logs a report_download event for analytics tracking
 */
export async function streamDownload(options: DownloadOptions): Promise<Response> {
  const { filePath, fileName, reportName, mimeType = 'application/pdf' } = options;
  
  try {
    // Attempt to generate a streaming response from the file
    const response = await fetch(new URL(filePath, process.env.NEXT_PUBLIC_BASE_URL));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }
    
    // Log the download event
    trackEvent('report_download', { reportName });
    logger.info({ 
      layer: 'download',
      action: 'report_download',
      reportName, 
      status: 200 
    }, `Report downloaded: ${reportName}`);
    
    // Create headers for the download
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    headers.set('Content-Type', mimeType);
    
    // Return the streaming response
    return new Response(response.body, {
      headers,
      status: 200,
    });
  } catch (error) {
    // Log download failure
    logger.error({ 
      layer: 'download',
      action: 'report_download_failed',
      reportName,
      error: (error as Error).message,
    }, `Failed to download report: ${reportName}`);
    
    // Return an appropriate error response
    return new Response(JSON.stringify({ 
      error: 'Failed to download the requested file' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 