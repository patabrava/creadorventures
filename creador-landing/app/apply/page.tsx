import FundingForm from '@/components/FundingForm';
import { Metadata } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Apply for Funding | Creador Ventures',
  description: 'Apply for funding through our streamlined process. Send your deck and get in touch with our investment team.',
};

export default function ApplyPage() {
  // Use error boundaries for safer rendering
  return (
    <main>
      <ErrorBoundary>
        <FundingForm />
      </ErrorBoundary>
    </main>
  );
} 