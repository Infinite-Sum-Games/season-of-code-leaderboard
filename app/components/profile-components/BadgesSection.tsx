'use client';
import CentralBadge from '@/app/components/profile-components/Badge';
import { useEffect, useState } from 'react';
import { BackgroundGradient } from '../ui/background-gradient';
import { Card } from '../ui/card';

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

const dummyBadges: Badge[] = [
  {
    id: 1,
    title: 'Pull Request Pro',
    description: 'Merged 1+ Pull Request.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Merge Master',
    description: 'Merged 5+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Engineer Overachiever',
    description: 'Merged 10+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 4,
    title: 'Code Crusader',
    description: 'Merged 20 Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 5,
    title: 'Bug Spotter',
    description: 'Got 1 bug accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Got 5 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 7,
    title: 'Bug Exterminator',
    description: 'Got 10 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 8,
    title: 'Polyglot',
    description: 'Contributed in 3 different languages.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 9,
    title: 'Jack of All Trades',
    description: 'Contributed in 5 different languages.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 10,
    title: 'The Scholar',
    description: 'Help out 1 person with their issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 11,
    title: 'The Facilitator',
    description: 'Help out 3 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 12,
    title: 'The Oracle',
    description: 'Help out 5 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 13,
    title: 'Issue Assistant',
    description: 'Got 1 testing related PR merged.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 14,
    title: 'Quality Assurer',
    description: 'Got 5 testing related PRs merged.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 15,
    title: 'Full-fledged Alchemist',
    description: 'Contribute 10 testing related PRs.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 16,
    title: 'Highly Creative',
    description: 'Get 2 feature suggestions accepted.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 17,
    title: 'Doc Shaman',
    description: 'Get 2 documentation PRs accepted.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 18,
    title: 'Shawn',
    description: 'Reach 250 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 19,
    title: 'Ricochet',
    description: 'Reach 500 bounty points.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 20,
    title: 'Firefinch',
    description: 'Reach 750 bounty points.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 21,
    title: 'The Scythe of Vyse',
    description: 'Reach 1000 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 22,
    title: 'Pioneers of Maximum Efforts',
    description: 'Most Rust issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 23,
    title: 'Crabby Coders',
    description: 'Most Rust issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 24,
    title: "Strimlander's Spirit",
    description: 'Most Zig issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 25,
    title: "Salamander's Toboggan",
    description: 'Most Zig issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 26,
    title: 'Mambo Montalvo',
    description: 'Most Python issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 27,
    title: 'Basilisk Defanged',
    description: 'Most Python issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 28,
    title: 'Apex Gophers',
    description: 'Most Go issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 29,
    title: 'Primal Suricats',
    description: 'Most Go issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 30,
    title: 'Forge Dwellers',
    description: 'Most JS/TS issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
  },
  {
    id: 31,
    title: 'Trop Killers',
    description: 'Most JS/TS issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 32,
    title: 'Weekly Warrior',
    description: 'Make a submission accepted for each weekly challenge.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 33,
    title: 'Pirate of Documentation',
    description: 'Contribute to 10 issues in the same language.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
  {
    id: 34,
    title: 'Unwavering',
    description: 'Got a PR accepted every week for a month.',
    icon: '/icon_badge.png',
    unlocked: false,
  },
];
const LoadingCard = () => (
  <div className="w-full flex items-center justify-center p-6">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg">
          <div className="text-center text-gray-300">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
            </div>
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Loading badges...
            </h2>
            <p className="mt-2 text-lg">
              Please wait while we load your badges 😊
            </p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

const ErrorCard = () => (
  <div className="w-full flex justify-center p-6">
    <div className="w-full max-w-5xl">
      <BackgroundGradient className="p-4 rounded-xl">
        <Card className="bg-[#050217] border border-gray-700 p-8 rounded-xl shadow-lg">
          <div className="text-center text-gray-300">
            <div className="flex justify-center mb-4 text-4xl text-red-500">
              ❌
            </div>
            <h2 className="text-3xl text-[#c8c7cc] font-semibold">
              Oops! Something went wrong.
            </h2>
            <p className="mt-2 text-lg">Please try again later 😊</p>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  </div>
);

export default function Badges() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [expandedBadgeId, setExpandedBadgeId] = useState<number | null>(null);
  const [hoveredBadgeId, setHoveredBadgeId] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        setBadges(dummyBadges);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load badges', err);
        setError(true);
        setLoading(false);
      }
    }, 800);
  }, []);
  if (loading) return <LoadingCard />;
  if (error) return <ErrorCard />;

  const unlockedBadges = badges.filter((badge) => badge.unlocked);
  const lockedBadges = badges.filter((badge) => !badge.unlocked);

  const sortedBadges = [...unlockedBadges, ...lockedBadges];

  const handleBadgeClick = (badgeId: number) => {
    setExpandedBadgeId(expandedBadgeId === badgeId ? null : badgeId);
  };

  return (
    <div className="relative w-full h-full bg-transparent backdrop-blur-2xl shadow-lg rounded-xl">
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 bg-clip-text  mb-2">
          Your Badges
        </h1>
        <p className="text-center text-gray-800 mb-6 text-sm">
          Collect achievements as you contribute to projects
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-h-[145vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedBadges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setHoveredBadgeId(badge.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setHoveredBadgeId(badge.id);
                    }
                  }}
                  onMouseLeave={() => setHoveredBadgeId(null)}
                >
                  <CentralBadge
                    variant={
                      hoveredBadgeId === badge.id
                        ? 'Expanded'
                        : !badge.unlocked
                          ? 'Locked'
                          : 'Collapsed'
                    }
                    title={badge.title}
                    description={badge.description}
                    date={badge.date}
                    icon={badge.icon || '🏆'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
