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
  
  // Sort team members alphabetically by name and limit to 4
  const sortedMembers = [...members]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 4); // Limit to 4 members
  
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
      className={`pt-20 px-6 ${darkMode ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
      style={{ 
        opacity: 1,
        transform: isVisible ? 'none' : 'translateY(40px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        visibility: 'visible',
        paddingBottom: 0
      }}
    >
      <div className="container mx-auto max-w-[1440px]">
        {title && (
          <h2 
            className="text-[48px] font-light leading-tight mb-8"
            style={{ opacity: 1 }}
          >
            {title}
          </h2>
        )}
        
        {description && (
          <p 
            className="text-[18px] leading-[28px] mb-16 max-w-[800px]"
            style={{ opacity: 1 }}
          >
            {description}
          </p>
        )}

        {/* Team members grid */}
        <div className="team-grid">
          <style jsx>{`
            .team-grid {
              display: grid;
              grid-template-columns: repeat(1, 1fr);
              gap: 2rem;
              width: 100%;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            
            @media (min-width: 640px) {
              .team-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            
            @media (min-width: 960px) {
              .team-grid {
                grid-template-columns: repeat(4, 1fr);
              }
            }
            
            .team-card {
              border: 2px solid;
              transition: transform 0.3s ease;
              overflow: hidden;
              margin-bottom: 0;
            }
            
            .team-card:hover {
              transform: translateY(-8px);
            }
            
            .photo-container {
              position: relative;
              width: 100%;
              padding-bottom: 150%; /* 2:3 aspect ratio */
            }
            
            .member-info {
              padding: 1.5rem;
            }
            
            .member-name {
              font-size: 28px;
              font-weight: 300;
              line-height: 1.15;
              margin-bottom: 0.5rem;
            }
            
            .member-role {
              margin-bottom: 1rem;
            }
            
            .member-bio {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 1.5rem;
            }
            
            .social-links {
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
            }
            
            .social-link {
              display: flex;
              align-items: center;
              transition: transform 0.2s ease;
            }
            
            .social-link:hover {
              transform: translateX(4px);
            }
          `}</style>
          
          {sortedMembers.map((member) => (
            <div 
              key={member.id}
              className="team-card"
              style={{ 
                borderColor: darkMode ? 'var(--paper)' : 'var(--ink)'
              }}
            >
              <div className="photo-container">
                <Image 
                  src={member.photo}
                  alt={`${member.name} photo`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  priority={true} // Prioritize loading all 4 members
                />
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p 
                  className="member-role"
                  style={{ color: 'var(--graphite-40)' }}
                >
                  {member.role}
                </p>
                
                {member.bio && (
                  <p className="member-bio">{member.bio}</p>
                )}
                
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="social-links">
                    {member.socialLinks.map((link) => (
                      <a
                        key={`${member.id}-${link.platform}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ color: darkMode ? 'var(--paper)' : 'var(--ink)' }}
                        onClick={() => handleSocialClick(member, link.platform)}
                      >
                        <span style={{ marginRight: '0.25rem' }}>{getSocialIcon(link.platform)}</span>
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