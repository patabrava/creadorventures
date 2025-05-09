import Hero from '@/components/Hero';
import VerticalSections from '@/components/VerticalSections';
import CTASection from '@/components/CTASection';
import PortfolioGrid from '@/components/PortfolioGrid';
import ReportGrid from '@/components/ReportGrid';
import { allPortfolios, allReports } from 'contentlayer/generated';

export default function Home() {
  return (
    <>
      <div style={{
        width: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)'
      }}>
        <Hero
          headline="Building value where others overlook"
          subheadline="Creador Ventures blends AI insight with local intuition to fund and accelerate bold founders in LATAM, Africa, Eastern Europe, and the Hispanic USA."
        />
        <VerticalSections />
        
        {/* Portfolio Section */}
        <PortfolioGrid items={allPortfolios} />
        
        {/* Reports Section */}
        <ReportGrid items={allReports} />
        
        <CTASection id="cta" />
      </div>
    </>
  );
}
