'use client';

import { Report } from 'contentlayer/generated';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/core/analytics';
import { format } from 'date-fns';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';

interface ReportGridProps {
  items: Report[];
}

/**
 * A grid of reports with download functionality following the neo-brutalist style
 */
export default function ReportGrid({ items }: ReportGridProps) {
  const router = useRouter();
  // Animation hook to work with global CSS section visibility
  const { ref, isVisible } = useAnimatedVisibility();
  
  // Sort items by date, most recent first
  const sortedItems = [...items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleDownload = (report: Report) => {
    // Track click event for analytics
    trackEvent('report_download', { reportName: report.title });
    
    // Redirect to download API route
    router.push(`/api/download?slug=${report.slug}`);
  };

  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 bg-paper text-ink ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        <h2 className="text-[48px] font-light leading-tight mb-8">Research Reports</h2>
        <p className="text-[18px] leading-[28px] mb-16 max-w-[800px]">
          Free public papers build reach and trust. Custom work for clients sits behind 
          private briefings. Browse and download the latest editions below.
        </p>
        
        <div className="space-y-12">
          {sortedItems.map((report) => (
            <div 
              key={report.slug}
              className="news-strip border-t border-b border-ink py-10 flex flex-col md:flex-row gap-6 bg-paper"
            >
              <div className="w-full md:w-[320px] h-[320px] flex-shrink-0 relative bg-paper border border-ink">
                <Image 
                  src={report.thumbnail}
                  alt={`${report.title} cover`}
                  className="news-strip-image object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              
              <div className="news-strip-content flex flex-col justify-between py-4 bg-paper">
                <div>
                  <p className="news-strip-date text-graphite-60 text-[16px] mb-4 font-medium">
                    {format(new Date(report.date), 'MMMM d, yyyy')}
                  </p>
                  <h3 className="news-strip-title text-[32px] font-light mb-6 text-ink">
                    {report.title}
                  </h3>
                  <p className="mb-6 text-ink">{report.description}</p>
                </div>
                
                <button 
                  onClick={() => handleDownload(report)}
                  className="arrow-link text-ink inline-flex items-center text-[18px] transition-transform hover:translate-x-2 font-medium"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 