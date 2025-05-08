import { streamDownload } from '@/core/download';
import { allReports } from 'contentlayer/generated';
import { NextRequest } from 'next/server';
import logger from '@/core/logger';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return new Response(JSON.stringify({ 
      error: 'No report slug provided' 
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // Find the report by slug
  const report = allReports.find((r) => r.slug === slug);
  
  if (!report) {
    logger.warn({ 
      layer: 'api_route',
      route: '/api/download',
      slug,
    }, `Report not found: ${slug}`);
    
    return new Response(JSON.stringify({ 
      error: 'Report not found' 
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // Extract filename from the path
  const fileName = report.pdfUrl.split('/').pop() || `${report.slug}.pdf`;
  
  // Stream the download
  return streamDownload({
    filePath: report.pdfUrl,
    fileName,
    reportName: report.title,
  });
} 