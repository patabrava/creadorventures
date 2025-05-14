import ReportGrid from '@/components/ReportGrid';
import { allReports } from 'contentlayer/generated';

export default function ReportsPage() {
  return (
    <div style={{
      width: '100%',
      padding: 0,
      margin: 0,
      backgroundColor: 'var(--paper)',
      color: 'var(--ink)'
    }}>
      <ReportGrid items={allReports} />
    </div>
  );
} 