'use client';
import { Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

// Badge Interface
interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  tier: string;
  progress?: number;
}

// Dummy badge data (same as provided)
const dummyBadges: Badge[] = [
  {
    id: 1,
    title: 'Pull Request Pro',
    description: 'Merged 1+ Pull Request.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-10',
  },
  {
    id: 2,
    title: 'Merge Master',
    description: 'Merged 5+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-12',
  },
  {
    id: 3,
    title: 'Engineer Overachiever',
    description: 'Merged 10+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 80,
  },
  {
    id: 4,
    title: 'Code Crusader',
    description: 'Merged 20 Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'diamond',
    progress: 50,
  },
  {
    id: 5,
    title: 'Bug Spotter',
    description: 'Got 1 bug accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-08',
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Got 5 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 60,
  },
  {
    id: 7,
    title: 'Bug Exterminator',
    description: 'Got 10 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-14',
  },
  {
    id: 8,
    title: 'Polyglot',
    description: 'Contributed in 3 different languages.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 40,
  },
  {
    id: 9,
    title: 'Jack of All Trades',
    description: 'Contributed in 5 different languages.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-11',
  },
  {
    id: 10,
    title: 'The Scholar',
    description: 'Help out 1 person with their issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'bronze',
    progress: 90,
  },
  {
    id: 11,
    title: 'The Facilitator',
    description: 'Help out 3 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 30,
  },
  {
    id: 12,
    title: 'The Oracle',
    description: 'Help out 5 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-09',
  },
  {
    id: 13,
    title: 'Issue Assistant',
    description: 'Got 1 testing related PR merged.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'bronze',
    progress: 70,
  },
  {
    id: 14,
    title: 'Quality Assurer',
    description: 'Got 5 testing related PRs merged.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-07',
  },
  {
    id: 15,
    title: 'Full-fledged Alchemist',
    description: 'Contribute 10 testing related PRs.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 20,
  },
  {
    id: 16,
    title: 'Highly Creative',
    description: 'Get 2 feature suggestions accepted.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 10,
  },
  {
    id: 17,
    title: 'Doc Shaman',
    description: 'Get 2 documentation PRs accepted.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'bronze',
    progress: 50,
  },
  {
    id: 18,
    title: 'Shawn',
    description: 'Reach 250 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-06',
  },
  {
    id: 19,
    title: 'Ricochet',
    description: 'Reach 500 bounty points.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 85,
  },
  {
    id: 20,
    title: 'Firefinch',
    description: 'Reach 750 bounty points.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 60,
  },
  {
    id: 21,
    title: 'The Scythe of Vyse',
    description: 'Reach 1000 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'diamond',
    date: '2025-05-05',
  },
  {
    id: 22,
    title: 'Pioneers of Maximum Efforts',
    description: 'Most Rust issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 40,
  },
  {
    id: 23,
    title: 'Crabby Coders',
    description: 'Most Rust issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 70,
  },
  {
    id: 24,
    title: "Strimlander's Spirit",
    description: 'Most Zig issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-04',
  },
  {
    id: 25,
    title: "Salamander's Toboggan",
    description: 'Most Zig issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 30,
  },
  {
    id: 26,
    title: 'Mambo Montalvo',
    description: 'Most Python issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 50,
  },
  {
    id: 27,
    title: 'Basilisk Defanged',
    description: 'Most Python issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-03',
  },
  {
    id: 28,
    title: 'Apex Gophers',
    description: 'Most Go issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 20,
  },
  {
    id: 29,
    title: 'Primal Suricats',
    description: 'Most Go issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 60,
  },
  {
    id: 30,
    title: 'Forge Dwellers',
    description: 'Most JS/TS issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-02',
  },
  {
    id: 31,
    title: 'Trop Killers',
    description: 'Most JS/TS issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 80,
  },
  {
    id: 32,
    title: 'Weekly Warrior',
    description: 'Make a submission accepted for each weekly challenge.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 90,
  },
  {
    id: 33,
    title: 'Pirate of Documentation',
    description: 'Contribute to 10 issues in the same language.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 40,
  },
  {
    id: 34,
    title: 'Unwavering',
    description: 'Got a PR accepted every week for a month.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 70,
  },
];

function BadgeCard({ badge }: { badge: Badge }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const tierStyles = {
    bronze: 'from-amber-600 via-amber-700 to-orange-800 border-amber-400',
    silver: 'from-slate-400 via-silver-300 to-slate-600 border-slate-200',
    gold: 'from-yellow-400 via-amber-500 to-yellow-600 border-yellow-300',
    diamond: 'from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300',
  };

  const tierStylesLocked = {
    bronze:
      'from-amber-800/40 via-amber-900/40 to-orange-900/40 border-amber-600/50',
    silver:
      'from-slate-500/40 via-silver-600/40 to-slate-700/40 border-slate-400/50',
    gold: 'from-yellow-600/40 via-amber-700/40 to-yellow-800/40 border-yellow-500/50',
    diamond:
      'from-cyan-600/40 via-blue-700/40 to-indigo-800/40 border-cyan-500/50',
  };

  const glowEffect = {
    bronze: 'shadow-amber-500/90',
    silver: 'shadow-slate-300/90',
    gold: 'shadow-yellow-400/90',
    diamond: 'shadow-cyan-400/90',
  };

  return (
    <div
      className="relative w-40 h-56 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl border-2 shadow-lg overflow-hidden
          ${
            badge.unlocked
              ? `bg-gradient-to-br ${
                  tierStyles[badge.tier as keyof typeof tierStyles]
                } ${
                  badge.unlocked
                    ? `shadow-lg ${
                        glowEffect[badge.tier as keyof typeof glowEffect]
                      }`
                    : ''
                }`
              : `bg-gradient-to-br ${
                  tierStylesLocked[badge.tier as keyof typeof tierStylesLocked]
                }`
          }`}
        >
          {/* SVG Background Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 160 224"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 10 }).map((_, i) => {
              const yOffset = i * 24;
              return (
                <path
                  key={`badge-card-front-path-${i}-${Math.random()
                    .toString(36)
                    .substring(2, 9)}`}
                  d={Array.from({ length: 31 })
                    .map((_, x) => {
                      const xPos = x * 5.33;
                      const yPos =
                        yOffset +
                        Math.sin(xPos / 20) * 8 +
                        Math.cos((xPos + i * 20) / 15) * 4;
                      return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
                    })
                    .join(' ')}
                  stroke={`rgba(255, 255, 255, ${
                    badge.unlocked ? 0.15 + i * 0.02 : 0.05 + i * 0.01
                  })`}
                  strokeWidth="1"
                  fill="none"
                  className="animate-wave"
                />
              );
            })}
          </svg>

          {/* Badge Icon Container */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div className="relative w-20 h-20 rounded-full border-4 bg-gray-800 overflow-hidden shadow-xl">
              <img
                src={badge.icon}
                alt={`${badge.title} icon`}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  badge.unlocked ? 'brightness-100' : 'grayscale opacity-60'
                }`}
              />
              {!badge.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Front Side Content */}
          <div className="absolute bottom-0 w-full text-center px-3 pb-4 z-10">
            <h3
              className={`text-sm font-semibold tracking-wide mb-2 ${
                badge.unlocked ? 'text-white' : 'text-gray-400'
              }`}
            >
              {badge.title}
            </h3>
            {badge.progress !== undefined && (
              <div className="w-full mt-1">
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {badge.progress}% to Unlock
                </p>
              </div>
            )}
            {badge.unlocked && badge.date && (
              <p className="text-xs text-blue-300 mt-1">
                Unlocked on {badge.date}
              </p>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl border-2 overflow-hidden rotate-y-180
          ${
            badge.unlocked
              ? `bg-gradient-to-br ${
                  tierStyles[badge.tier as keyof typeof tierStyles]
                } ${
                  badge.unlocked
                    ? `shadow-lg ${
                        glowEffect[badge.tier as keyof typeof glowEffect]
                      }`
                    : ''
                }`
              : `bg-gradient-to-br ${
                  tierStylesLocked[badge.tier as keyof typeof tierStylesLocked]
                }`
          }`}
        >
          {/* SVG Background Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 160 224"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 10 }).map((_, i) => {
              const yOffset = i * 24;
              return (
                <path
                  key={`badge-card-back-path-${i}-${Math.random()
                    .toString(36)
                    .substring(2, 9)}`}
                  d={Array.from({ length: 31 })
                    .map((_, x) => {
                      const xPos = x * 5.33;
                      const yPos =
                        yOffset +
                        Math.sin(xPos / 20) * 8 +
                        Math.cos((xPos + i * 20) / 15) * 4;
                      return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
                    })
                    .join(' ')}
                  stroke={`rgba(255, 255, 255, ${
                    badge.unlocked ? 0.15 + i * 0.02 : 0.05 + i * 0.01
                  })`}
                  strokeWidth="1"
                  fill="none"
                  className="animate-wave"
                />
              );
            })}
          </svg>

          {/* Back Side Content */}
          <div className="relative flex flex-col h-full px-4 py-4 text-center">
            <h3
              className={`text-sm font-semibold tracking-wide mb-2 ${
                badge.unlocked ? 'text-white' : 'text-gray-400'
              }`}
            >
              {badge.title}
            </h3>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <p
                className={`text-xs leading-relaxed ${
                  badge.unlocked ? 'text-gray-200' : 'text-gray-400'
                }`}
              >
                {badge.description || 'No description available.'}
              </p>
            </div>
            {badge.unlocked && badge.date && (
              <p className="text-xs text-blue-300 mt-2">
                Unlocked on {badge.date}
              </p>
            )}
            {!badge.unlocked && badge.progress !== undefined && (
              <div className="w-full mt-2">
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {badge.progress}% to Unlock
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Badges Component
export default function Badges() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredBadges = dummyBadges.filter((badge) => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  return (
    <div className="min-h-screen p-6">
      <div className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Achievements</h1>
          <p className="text-white text-sm">
            Unlock badges by contributing to projects and mastering challenges!
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All ({dummyBadges.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unlocked')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'unlocked'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Unlocked ({dummyBadges.filter((b) => b.unlocked).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('locked')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'locked'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Locked ({dummyBadges.filter((b) => !b.unlocked).length})
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-96 overflow-y-auto p-2">
          {filteredBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
            />
          ))}
        </div>

        {/* CSS for animations */}
        <style
          jsx
          global
        >{`
          .perspective-1000 {
            perspective: 1000px;
          }

          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }

          .backface-hidden {
            backface-visibility: hidden;
          }

          .rotate-y-180 {
            transform: rotateY(180deg);
          }

          @keyframes wave {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(3px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-wave {
            animation: wave 4s infinite ease-in-out;
          }

          .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  );
}
