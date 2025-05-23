'use client';

import TeamGrid, { TeamMember } from '@/components/TeamGrid';

// Team members ordered by their member IDs
const teamMembers: TeamMember[] = [
  {
    id: 'member1',
    name: 'Nicolas Weber',
    role: 'General Partner',
    photo: 'https://picsum.photos/seed/jane/400/600',
    bio: 'Experienced entrepreneur with background in AI and venture capital.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member2',
    name: 'Till Rügge',
    role: 'General Partner',
    photo: 'https://picsum.photos/seed/john/400/600',
    bio: 'Former VC with expertise in fintech and marketplace startups.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member3',
    name: 'Julian Ullrich',
    role: 'General Partner',
    photo: 'https://picsum.photos/seed/maria/400/600',
    bio: 'Former VC with expertise in fintech and marketplace startups.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
  },
  {
    id: 'member4',
    name: 'Camilo Echeverri',
    role: 'Operations Manager',
    photo: 'https://picsum.photos/seed/sophia/400/600',
    bio: 'Operational expert with a background in scaling startups across LATAM.',
    socialLinks: [
      { platform: 'twitter', url: 'https://linkedin.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/' },
      { platform: 'github', url: 'mailto:sophia@creadorventures.com' },
    ],
  }
];

// Common style for full visibility with black background and white text
const visibleStyle = {
  opacity: 1,
  transform: 'none',
  visibility: 'visible' as const,
  color: 'var(--paper)',
  backgroundColor: 'var(--ink)'
};

export default function TeamPage() {
  return (
    <main 
      className="min-h-screen bg-ink text-paper" 
      style={{
        ...visibleStyle,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 0,
        marginBottom: 0
      }}
    >
      {/* Hero Section */}
      <section 
        className="min-h-[40vh] py-24 px-6 relative bg-ink text-paper flex flex-col justify-center"
        style={{ 
          ...visibleStyle,
          paddingBottom: '8rem'
        }}
      >
        <div 
          className="container mx-auto max-w-[1440px] relative z-10"
          style={{ opacity: 1 }}
        >
          <h1 
            className="font-light text-[clamp(56px,8vw,120px)] leading-[1.05] mb-16 max-w-[900px]"
            style={{ 
              opacity: 1,
              color: 'var(--paper)',
              fontWeight: 300
            }}
          >
            The team behind<br />Creador Ventures
          </h1>
          <p 
            className="text-[18px] leading-[28px] mb-24 max-w-[600px] text-paper"
            style={{ opacity: 1, color: 'var(--paper)' }}
          >
            Our diverse team brings together expertise in technology, investment, and entrepreneurship to build the future of Latin American startups.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <TeamGrid 
        members={teamMembers}
        title="Meet Our Team"
        description="We're a group of technologists, investors, and entrepreneurs passionate about supporting the next generation of Latin American founders."
        darkMode={true}
      />
    </main>
  );
} 