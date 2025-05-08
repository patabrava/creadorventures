import Hero from '@/components/Hero';
import VerticalSections from '@/components/VerticalSections';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <div style={{
        width: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        marginTop: '80px' // Add margin for the fixed header
      }}>
        <Hero
          headline="Building value where others overlook"
          subheadline="Creador Ventures blends AI insight with local intuition to fund and accelerate bold founders in LATAM, Africa, Eastern Europe, and the Hispanic USA."
        />
        <VerticalSections />
        <CTASection id="cta" />
      </div>
    </>
  );
}
