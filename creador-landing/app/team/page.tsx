'use client';

import TeamGrid, { TeamMember } from '@/components/TeamGrid';

// Sample data for the TeamGrid component
const teamMembers: TeamMember[] = [
  {
    id: 'member1',
    name: 'Jane Doe',
    role: 'CEO & Founder',
    photo: 'https://picsum.photos/seed/jane/400/400',
    bio: 'Experienced entrepreneur with background in AI and venture capital.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member2',
    name: 'John Smith',
    role: 'CTO',
    photo: 'https://picsum.photos/seed/john/400/400',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member3',
    name: 'Alex Johnson',
    role: 'Design Lead',
    photo: 'https://picsum.photos/seed/alex/400/400',
    bio: 'Award-winning designer focused on user experience and digital products.',
    socialLinks: [
      { platform: 'email', url: 'mailto:alex@creadorventures.com' },
    ],
  },
  {
    id: 'member4',
    name: 'Maria Garcia',
    role: 'Investment Partner',
    photo: 'https://picsum.photos/seed/maria/400/400',
    bio: 'Former VC with expertise in fintech and marketplace startups.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member5',
    name: 'David Lee',
    role: 'Lead Developer',
    photo: 'https://picsum.photos/seed/david/400/400',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/' },
    ],
  },
  {
    id: 'member6',
    name: 'Sophia Kim',
    role: 'Operations Manager',
    photo: 'https://picsum.photos/seed/sophia/400/400',
    bio: 'Operational expert with a background in scaling startups across LATAM.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/' },
      { platform: 'email', url: 'mailto:sophia@creadorventures.com' },
    ],
  },
];

export default function TeamPage() {
  return (
    <main>
      {/* Team Grid Section */}
      <TeamGrid 
        members={teamMembers}
        title="Our Team"
        description="Meet the people behind Creador Ventures. Our diverse team brings together expertise in technology, investment, and entrepreneurship."
        darkMode={true}
      />
    </main>
  );
} 