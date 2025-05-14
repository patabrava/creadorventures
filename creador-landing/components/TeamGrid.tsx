'use client';

import Image from 'next/image';
import { useAnimatedVisibility } from '@/hooks/useAnimatedVisibility';
import { trackEvent } from '@/core/analytics';

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'email';
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  socialLinks?: SocialLink[];
}

interface TeamGridProps {
  members: TeamMember[];
  title?: string;
  description?: string;
  darkMode?: boolean;
}

/**
 * TeamGrid Component
 * Displays a responsive grid of team members with photos and information
 * Implements Neo-Brutalist Minimalism style guide
 */
export default function TeamGrid({ 
  members, 
  title = 'Our Team', 
  description,
  darkMode = false
}: TeamGridProps) {
  const { ref, isVisible } = useAnimatedVisibility();
  
  // Sort team members alphabetically by name
  const sortedMembers = [...members].sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  
  // Handle social link click
  const handleSocialClick = (member: TeamMember, platform: string) => {
    trackEvent('team_social_click', {
      team_member: member.name,
      platform: platform
    });
  };
  
  // Get social icon based on platform
  const getSocialIcon = (platform: string): string => {
    switch (platform) {
      case 'twitter': return '↗';
      case 'linkedin': return '↗';
      case 'github': return '↗';
      case 'email': return '✉';
      default: return '↗';
    }
  };
  
  return (
    <section 
      ref={ref} 
      className={`py-20 px-6 ${darkMode ? 'bg-ink text-paper' : 'bg-paper text-ink'} ${isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-[1440px]">
        {title && (
          <h2 className="text-[48px] font-light leading-tight mb-8">{title}</h2>
        )}
        
        {description && (
          <p className="text-[18px] leading-[28px] mb-16 max-w-[800px]">
            {description}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {sortedMembers.map((member) => (
            <div 
              key={member.id}
              className={`team-card relative transition-transform hover:translate-y-[-8px] ${darkMode ? 'border-2 border-paper' : 'border-2 border-ink'}`}
            >
              {/* Photo */}
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={member.photo}
                  alt={`${member.name} photo`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-[28px] font-light mb-2">{member.name}</h3>
                <p className="text-graphite-60 mb-4">{member.role}</p>
                
                {member.bio && (
                  <p className="mb-6 text-[16px] leading-[1.5]">{member.bio}</p>
                )}
                
                {/* Social Links */}
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {member.socialLinks.map((link) => (
                      <a
                        key={`${member.id}-${link.platform}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center ${darkMode ? 'text-paper hover:text-graphite-40' : 'text-ink hover:text-graphite-60'} transition-colors`}
                        onClick={() => handleSocialClick(member, link.platform)}
                      >
                        <span className="mr-1">{getSocialIcon(link.platform)}</span>
                        <span>{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 