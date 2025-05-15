'use client';
import { Lock } from 'lucide-react';
import { useState } from 'react';

// Badge Interface
interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  progress?: number;
  category: string;
  position: number;
  requires?: number[];
}

// Category Interface
interface Category {
  id: string;
  name: string;
  icon: string;
}

// Connection Interface for badge connections
interface Connection {
  from: number;
  to: number;
  unlocked: boolean;
}

// Tier Styles Interface
interface TierStyles {
  bronze: string;
  silver: string;
  gold: string;
  diamond: string;
}

// Enhanced badge data with categories and requirements
const achievementData: Badge[] = [
  // CODING PATH (All unlocked, including diamond)
  {
    id: 1,
    title: 'Pull Request Pro',
    description: 'Merged 1+ Pull Request.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-10',
    category: 'code',
    position: 1,
  },
  {
    id: 2,
    title: 'Merge Master',
    description: 'Merged 5+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-12',
    category: 'code',
    position: 2,
    requires: [1],
  },
  {
    id: 3,
    title: 'Engineer Overachiever',
    description: 'Merged 10+ Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-14',
    category: 'code',
    position: 3,
    requires: [2],
  },
  {
    id: 4,
    title: 'Code Crusader',
    description: 'Merged 20 Pull Requests.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'diamond',
    date: '2025-05-15',
    category: 'code',
    position: 4,
    requires: [3],
  },

  // BUG HUNTING PATH (Unlocked up to gold)
  {
    id: 5,
    title: 'Bug Spotter',
    description: 'Got 1 bug accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-08',
    category: 'bugs',
    position: 1,
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Got 5 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-12',
    category: 'bugs',
    position: 2,
    requires: [5],
  },
  {
    id: 7,
    title: 'Bug Exterminator',
    description: 'Got 10 bugs accepted (issue).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-14',
    category: 'bugs',
    position: 3,
    requires: [6],
  },

  // POLYGLOT PATH (Only silver unlocked)
  {
    id: 8,
    title: 'Polyglot',
    description: 'Contributed in 3 different languages.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-11',
    category: 'languages',
    position: 1,
  },
  {
    id: 9,
    title: 'Jack of All Trades',
    description: 'Contributed in 5 different languages.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 40,
    category: 'languages',
    position: 2,
    requires: [8],
  },

  // MENTORSHIP PATH (Only bronze unlocked)
  {
    id: 10,
    title: 'The Scholar',
    description: 'Help out 1 person with their issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-09',
    category: 'mentor',
    position: 1,
  },
  {
    id: 11,
    title: 'The Facilitator',
    description: 'Help out 3 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 30,
    category: 'mentor',
    position: 2,
    requires: [10],
  },
  {
    id: 12,
    title: 'The Oracle',
    description: 'Help out 5 people with issue solving (in group).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 10,
    category: 'mentor',
    position: 3,
    requires: [11],
  },

  // QUALITY ASSURANCE PATH (Unlocked up to gold)
  {
    id: 13,
    title: 'Issue Assistant',
    description: 'Got 1 testing related PR merged.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-07',
    category: 'qa',
    position: 1,
  },
  {
    id: 14,
    title: 'Quality Assurer',
    description: 'Got 5 testing related PRs merged.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-10',
    category: 'qa',
    position: 2,
    requires: [13],
  },
  {
    id: 15,
    title: 'Full-fledged Alchemist',
    description: 'Contribute 10 testing related PRs.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-12',
    category: 'qa',
    position: 3,
    requires: [14],
  },

  // CREATIVITY PATH (Only bronze unlocked)
  {
    id: 17,
    title: 'Doc Shaman',
    description: 'Get 2 documentation PRs accepted.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-06',
    category: 'creative',
    position: 1,
  },
  {
    id: 16,
    title: 'Highly Creative',
    description: 'Get 2 feature suggestions accepted.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'silver',
    progress: 10,
    category: 'creative',
    position: 2,
  },

  // POINTS PATH (All unlocked, including diamond)
  {
    id: 18,
    title: 'Shawn',
    description: 'Reach 250 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'bronze',
    date: '2025-05-06',
    category: 'points',
    position: 1,
  },
  {
    id: 19,
    title: 'Ricochet',
    description: 'Reach 500 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-08',
    category: 'points',
    position: 2,
    requires: [18],
  },
  {
    id: 20,
    title: 'Firefinch',
    description: 'Reach 750 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-10',
    category: 'points',
    position: 3,
    requires: [19],
  },
  {
    id: 21,
    title: 'The Scythe of Vyse',
    description: 'Reach 1000 bounty points.',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'diamond',
    date: '2025-05-12',
    category: 'points',
    position: 4,
    requires: [20],
  },

  // LANGUAGE MASTERY PATHS (Mixed progress across all 5 languages)
  // Rust (Only silver unlocked)
  {
    id: 23,
    title: 'Crabby Coders',
    description: 'Most Rust issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-05',
    category: 'lang_mastery',
    position: 1,
  },
  {
    id: 22,
    title: 'Pioneers of Maximum Efforts',
    description: 'Most Rust issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 40,
    category: 'lang_mastery',
    position: 2,
    requires: [23],
  },
  // Zig (Up to gold)
  {
    id: 24,
    title: "Salamander's Toboggan",
    description: 'Most Zig issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-04',
    category: 'lang_mastery',
    position: 3,
  },
  {
    id: 25,
    title: "Strimlander's Spirit",
    description: 'Most Zig issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-05',
    category: 'lang_mastery',
    position: 4,
    requires: [24],
  },
  // Python (Only silver unlocked)
  {
    id: 27,
    title: 'Basilisk Defanged',
    description: 'Most Python issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-03',
    category: 'lang_mastery',
    position: 5,
  },
  {
    id: 26,
    title: 'Mambo Montalvo',
    description: 'Most Python issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 50,
    category: 'lang_mastery',
    position: 6,
    requires: [27],
  },
  // Go (Only silver unlocked)
  {
    id: 29,
    title: 'Primal Suricats',
    description: 'Most Go issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-03',
    category: 'lang_mastery',
    position: 7,
  },
  {
    id: 28,
    title: 'Apex Gophers',
    description: 'Most Go issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 20,
    category: 'lang_mastery',
    position: 8,
    requires: [29],
  },
  // JS/TS (Up to gold)
  {
    id: 31,
    title: 'Trop Killers',
    description: 'Most JS/TS issues solved (2nd place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'silver',
    date: '2025-05-03',
    category: 'lang_mastery',
    position: 9,
  },
  {
    id: 30,
    title: 'Forge Dwellers',
    description: 'Most JS/TS issues solved (1st place).',
    icon: '/icon_badge.png',
    unlocked: true,
    tier: 'gold',
    date: '2025-05-04',
    category: 'lang_mastery',
    position: 10,
    requires: [31],
  },

  // MASTERY PATH (None unlocked, cross-category)
  {
    id: 32,
    title: 'Weekly Warrior',
    description: 'Make a submission accepted for each weekly challenge.',
    icon: '/icon_badge.png',
    unlocked: false,
    tier: 'gold',
    progress: 90,
    category: 'mastery',
    position: 1,
    requires: [2, 5, 8],
  },
];

// Category definitions with display names and icons
const categories: Category[] = [
  { id: 'code', name: 'Code Mastery', icon: '🧩' },
  { id: 'bugs', name: 'Bug Hunter', icon: '🐛' },
  { id: 'languages', name: 'Polyglot', icon: '🌐' },
  { id: 'mentor', name: 'Mentorship', icon: '🧠' },
  { id: 'qa', name: 'Quality Assurance', icon: '🔍' },
  { id: 'creative', name: 'Documentation & Ideas', icon: '💡' },
  { id: 'points', name: 'Points Progression', icon: '⭐' },
  { id: 'lang_mastery', name: 'Language Competition', icon: '🏆' },
  { id: 'mastery', name: 'Ultimate Mastery', icon: '👑' },
];

// BadgeNode Component
function BadgeNode({
  badge,
  allBadges,
  onClick,
}: {
  badge: Badge;
  allBadges: Badge[];
  onClick: (badge: Badge) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const tierStyles: TierStyles = {
    bronze: 'from-amber-600 via-amber-700 to-orange-800 border-amber-400',
    silver: 'from-slate-400 via-silver-300 to-slate-600 border-slate-200',
    gold: 'from-yellow-400 via-amber-500 to-yellow-600 border-yellow-300',
    diamond: 'from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300',
  };

  const tierStylesLocked: TierStyles = {
    bronze: 'from-gray-500 via-gray-600 to-gray-700 border-gray-400',
    silver: 'from-gray-400 via-gray-500 to-gray-600 border-gray-300',
    gold: 'from-gray-300 via-gray-400 to-gray-500 border-gray-200',
    diamond: 'from-gray-200 via-gray-300 to-gray-400 border-gray-100',
  };

  const glowEffect: TierStyles = {
    bronze: 'shadow-amber-500/40',
    silver: 'shadow-slate-300/40',
    gold: 'shadow-yellow-400/40',
    diamond: 'shadow-cyan-400/40',
  };

  const isLocked =
    !badge.unlocked &&
    badge.requires?.some((reqId) => {
      const requiredBadge = allBadges.find((b) => b.id === reqId);
      return requiredBadge && !requiredBadge.unlocked;
    });

  return (
    <div className="relative">
      <button
        type="button"
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 cursor-pointer transition-all duration-300 ${
          badge.unlocked
            ? `bg-gradient-to-br ${tierStyles[badge.tier]} shadow-lg ${
                glowEffect[badge.tier]
              }`
            : `bg-gradient-to-br ${tierStylesLocked[badge.tier]} ${
                isLocked ? 'opacity-100' : ''
              }`
        } ${hovered ? 'scale-110 z-10' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(badge)}
        aria-label={`View details for ${badge.title}`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0">
            <svg
              className="w-full h-full opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-labelledby={`pattern-title-${badge.id}`}
            >
              <title id={`pattern-title-${badge.id}`}>Ripple background</title>
              {Array.from({ length: 5 }).map((_, i) => (
                <circle
                  key={`circle-${badge.id}-${i}`}
                  cx="50"
                  cy="50"
                  r={20 + i * 15}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <img
            src={badge.icon}
            alt={badge.title}
            className={`w-full h-full object-cover transition-all ${
              badge.unlocked ? '' : 'grayscale opacity-60'
            }`}
          />

          {!badge.unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Lock className="w-4 h-4 text-gray-900" />
            </div>
          )}
        </div>

        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-bold text-gray-900">
          {badge.tier === 'bronze' && '🥉'}
          {badge.tier === 'silver' && '🥈'}
          {badge.tier === 'gold' && '🥇'}
          {badge.tier === 'diamond' && '💎'}
        </div>

        {!badge.unlocked && badge.progress !== undefined && (
          <svg
            className="absolute -top-2 -right-2 w-6 h-6 rotate-270"
            role="img"
            aria-labelledby={`progress-title-${badge.id}`}
          >
            <title id={`progress-title-${badge.id}`}>Progress indicator</title>
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#374151"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 6}`}
              strokeDashoffset={`${
                2 * Math.PI * 6 * (1 - badge.progress / 100)
              }`}
              fill="none"
            />
          </svg>
        )}
      </button>

      {hovered && (
        <div className="absolute z-20 w-40 bg-white/75 backdrop-blur-md rounded-xl shadow-lg border border-white/50 p-2 -translate-x-1/2 left-1/2 bottom-full mb-2">
          <h3
            className={`text-xs font-bold ${
              badge.unlocked ? 'text-gray-900' : 'text-gray-700'
            }`}
          >
            {badge.title}
          </h3>
          <p className="text-[10px] text-gray-700 mt-1">{badge.description}</p>
          {!badge.unlocked && badge.progress !== undefined && (
            <div className="mt-1">
              <div className="w-full bg-white/10 rounded-full h-1">
                <div
                  className="bg-blue-400 h-1 rounded-full"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                {badge.progress}% Complete
              </p>
            </div>
          )}
          {badge.unlocked && badge.date && (
            <p className="text-[10px] text-blue-300 mt-1">
              Unlocked on {badge.date}
            </p>
          )}
          <div className="absolute w-2 h-2 bg-white/10 rotate-45 -bottom-1 left-1/2 -ml-1 border-b border-r border-white/20" />
        </div>
      )}
    </div>
  );
}

// BadgeDetails Component
function BadgeDetails({
  badge,
  onClose,
}: {
  badge: Badge | null;
  onClose: () => void;
}) {
  if (!badge) return null;

  const tierStyles: Record<string, string> = {
    bronze: 'from-amber-500 via-amber-600 to-orange-600',
    silver: 'from-gray-300 via-gray-400 to-gray-500',
    gold: 'from-yellow-300 via-yellow-400 to-yellow-500',
    diamond: 'from-cyan-400 via-blue-500 to-indigo-500',
  };

  const tierStylesLocked: Record<string, string> = {
    bronze: 'from-gray-500 via-gray-600 to-gray-700',
    silver: 'from-gray-400 via-gray-500 to-gray-600',
    gold: 'from-gray-300 via-gray-400 to-gray-500',
    diamond: 'from-gray-200 via-gray-300 to-gray-400',
  };

  const tierEmoji: Record<string, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
  };

  const isUnlocked = badge.unlocked;
  const gradient = isUnlocked
    ? tierStyles[badge.tier]
    : tierStylesLocked[badge.tier];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl border overflow-hidden mx-4">
        {/* Header */}
        <div className={`h-28 bg-gradient-to-br ${gradient} relative`}>
          {/* Wave pattern */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 128"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <title>Decorative wave pattern</title>
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={`wave-path-${i}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`}
                d={`M 0 ${20 + i * 10} Q 100 ${10 + i * 15}, 200 ${
                  25 + i * 8
                } T 400 ${18 + i * 12}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Icon */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 relative">
              <img
                src={badge.icon}
                alt={badge.title}
                className={`rounded-xl border-4 border-white w-full h-full object-cover ${
                  isUnlocked ? 'shadow-lg' : 'grayscale opacity-60'
                }`}
              />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                  <Lock className="w-7 h-7 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 pb-5 px-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {badge.title}
            </h2>
            <span className="text-base">{tierEmoji[badge.tier]}</span>
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">
            {badge.description || 'No Description'}
          </p>

          {isUnlocked && badge.date && (
            <div className="flex justify-center mb-4">
              <span className="text-xs bg-blue-50 text-blue-500 px-3 py-1 rounded-full border border-blue-200">
                Unlocked on {badge.date}
              </span>
            </div>
          )}

          {!isUnlocked && badge.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            type="button"
            className="mt-3 w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// AchievementTree Component
function AchievementTree({
  category,
  badges,
  onClick,
}: {
  category: Category;
  badges: Badge[];
  onClick: (badge: Badge) => void;
}) {
  const categoryBadges = badges.filter(
    (b: Badge) => b.category === category.id,
  );
  const catDetails = categories.find((c: Category) => c.id === category.id);

  // Calculate connections between badges based on requirements
  const connections: Record<string, Connection> = {};

  // Replace forEach with for...of
  for (const badge of categoryBadges) {
    if (badge.requires) {
      for (const reqId of badge.requires) {
        // Only create connections within same category for cleaner UI
        const reqBadge = badges.find(
          (b: Badge) => b.id === reqId && b.category === category.id,
        );
        if (reqBadge) {
          const key = `${reqBadge.id}-${badge.id}`;
          connections[key] = {
            from: reqBadge.id,
            to: badge.id,
            unlocked: reqBadge.unlocked && badge.unlocked,
          };
        }
      }
    }
  }

  // Special layout for "lang_mastery" category (Language Competition)
  if (category.id === 'lang_mastery') {
    // Group badges by language (positions are paired: 1-2 Rust, 3-4 Zig, etc.)
    const languageGroups: { language: string; badges: Badge[] }[] = [
      {
        language: 'Rust',
        badges: categoryBadges.filter((b) => b.position <= 2),
      },
      {
        language: 'Zig',
        badges: categoryBadges.filter(
          (b) => b.position >= 3 && b.position <= 4,
        ),
      },
      {
        language: 'Python',
        badges: categoryBadges.filter(
          (b) => b.position >= 5 && b.position <= 6,
        ),
      },
      {
        language: 'Go',
        badges: categoryBadges.filter(
          (b) => b.position >= 7 && b.position <= 8,
        ),
      },
      {
        language: 'JS/TS',
        badges: categoryBadges.filter(
          (b) => b.position >= 9 && b.position <= 10,
        ),
      },
    ];

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{catDetails?.icon ?? '❓'}</span>
          <h2 className="text-lg text-gray-900 font-bold">
            {catDetails?.name ?? 'Unknown Category'}
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
          {languageGroups.map((group) => (
            <div
              key={`language-${group.language}`}
              className="relative flex flex-col items-center"
            >
              {/* Language Header */}
              <h3 className="text-sm text-gray-900 font-semibold mb-1">
                {group.language}
              </h3>

              {/* Connection Lines for this language group */}
              <svg
                className="absolute top-8 w-full h-[132px] pointer-events-none"
                aria-hidden="true"
                role="presentation"
              >
                <title>Connection lines between badges</title>
                {Object.values(connections)
                  .filter(
                    (conn) =>
                      group.badges.some((b) => b.id === conn.from) &&
                      group.badges.some((b) => b.id === conn.to),
                  )
                  .map((conn: Connection) => {
                    const fromBadge = group.badges.find(
                      (b) => b.id === conn.from,
                    );
                    const toBadge = group.badges.find((b) => b.id === conn.to);

                    if (!fromBadge || !toBadge) return null;

                    // Vertical connection for paired badges (e.g., 1st and 2nd place)
                    const x = 40; // Center of badge (w-16/2 = 32px, adjusted)
                    const fromY = 40; // Center of first badge
                    const toY = 104; // Center of second badge (first badge center + h-16 + gap-2)

                    return (
                      <line
                        key={`conn-${conn.from}-${conn.to}`}
                        x1={x}
                        y1={fromY}
                        x2={x}
                        y2={toY}
                        stroke={conn.unlocked ? '#4ADE80' : '#6B7280'}
                        strokeWidth="2"
                        strokeDasharray={conn.unlocked ? '' : '4,4'}
                      />
                    );
                  })}
              </svg>

              {/* Badges */}
              <div className="flex flex-col items-center gap-2">
                {group.badges
                  .sort((a: Badge, b: Badge) => a.position - b.position)
                  .map((badge: Badge) => (
                    <BadgeNode
                      key={badge.id}
                      badge={badge}
                      allBadges={badges}
                      onClick={onClick}
                      expanded={false}
                      connectionStates={connections}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default layout for other categories
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{catDetails?.icon ?? '❓'}</span>
        <h2 className="text-lg text-gray-900 font-bold">
          {catDetails?.name ?? 'Unknown Category'}
        </h2>
      </div>

      <div className="relative">
        {/* Connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          role="presentation"
        >
          <title>Achievement connections</title>
          {Object.values(connections).map((conn: Connection) => {
            const fromBadge = categoryBadges.find(
              (b: Badge) => b.id === conn.from,
            );
            const toBadge = categoryBadges.find((b) => b.id === conn.to);

            if (!fromBadge || !toBadge) return null;

            // Calculate positions for straight horizontal lines
            const badgeWidth = 80; // w-16 (64px) + mx-2 (16px total margin)
            const fromX =
              (fromBadge.position - 1) * badgeWidth + badgeWidth / 2;
            const toX = (toBadge.position - 1) * badgeWidth + badgeWidth / 2;
            const y = 40; // Center vertically (h-16/2 = 32px + border adjustments)

            return (
              <line
                key={`conn-${conn.from}-${conn.to}`}
                x1={fromX}
                y1={y}
                x2={toX}
                y2={y}
                stroke={conn.unlocked ? '#4ADE80' : '#6B7280'}
                strokeWidth="2"
                strokeDasharray={conn.unlocked ? '' : '4,4'}
              />
            );
          })}
        </svg>

        {/* Badges */}
        <div className="flex items-center">
          {categoryBadges
            .sort((a: Badge, b: Badge) => a.position - b.position)
            .map((badge: Badge) => (
              <div
                key={badge.id}
                className="mx-2 first:ml-0 last:mr-0"
                style={{ order: badge.position }}
              >
                <BadgeNode
                  badge={badge}
                  allBadges={badges}
                  onClick={onClick}
                  expanded={false}
                  connectionStates={connections}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function GameAchievementSystem() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredBadges = achievementData.filter((badge: Badge) => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  const unlockedCount = achievementData.filter((b: Badge) => b.unlocked).length;
  const totalCount = achievementData.length;
  const progressPercentage =
    Math.round((unlockedCount / totalCount) * 100) || 0;

  // Get latest unlocked achievements (last 3 unlocked, sorted by date)
  const latestAchievements = achievementData
    .filter((b: Badge) => b.unlocked && b.date)
    .sort((a: Badge, b: Badge) => {
      if (!a.date || !b.date) return 0; // Handle undefined dates
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <div className="relative mx-auto w-full max-w-[100%] sm:px-6 lg:px-0 py-8">
      <div className="bg-white/10 backdrop-blur-2xl text-gray-900 p-3 rounded-4xl h-full overflow-y-auto custom-scrollbar">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Developer Achievement System
              </h1>
              <p className="text-gray-700 text-sm text-center mb-3">
                Unlock skills and advance through the tech tree by contributing
                to projects. Track your progress and compete in language mastery
                challenges!
              </p>
              <div className="flex flex-col items-center">
                <div className="w-24 bg-white/10 rounded-full h-1.5 mb-1">
                  <div
                    className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-700">
                  {unlockedCount}/{totalCount} Achievements (
                  {progressPercentage}
                  %)
                </span>
              </div>
            </div>
            {/* Filter Controls */}
            <div className="mt-3 flex justify-center gap-3">
              <button
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                  filter === 'all'
                    ? 'bg-white/25 backdrop-blur-md text-gray-900'
                    : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                }`}
                onClick={() => setFilter('all')}
                type="button"
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                  filter === 'unlocked'
                    ? 'bg-white/25 backdrop-blur-md text-gray-900'
                    : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                }`}
                onClick={() => setFilter('unlocked')}
                type="button"
              >
                Unlocked
              </button>
              <button
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors border border-white/20 ${
                  filter === 'locked'
                    ? 'bg-white/25 backdrop-blur-md text-gray-900'
                    : 'bg-white/10 backdrop-blur-md text-gray-700 hover:bg-white/20'
                }`}
                onClick={() => setFilter('locked')}
                type="button"
              >
                Locked
              </button>
            </div>
          </div>
          {/* Latest Achievements */}
          {/* {latestAchievements.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg text-gray-900 font-bold mb-2">
                Latest Achievements
              </h2>
              <div className="flex flex-col gap-3">
                {latestAchievements.map((badge: Badge) => (
                  <div
                    key={badge.id}
                    className="bg-white/15 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-colors border border-white/20 shadow-lg"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={badge.icon}
                        alt={badge.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        {badge.title}
                      </h3>
                      <p className="text-[10px] text-gray-700">
                        {badge.description}
                      </p>
                      <p className="text-[10px] text-blue-300 mt-1">
                        Unlocked on {badge.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
          {/* Achievement Trees */}
          {categories.map((category: Category) => {
            const categoryBadges = filteredBadges.filter(
              (b: Badge) => b.category === category.id,
            );
            if (categoryBadges.length === 0) return null;
            return (
              <AchievementTree
                key={category.id}
                category={category}
                badges={filteredBadges}
                onClick={handleBadgeClick}
              />
            );
          })}
          {/* Badge Details Modal */}
          {selectedBadge && (
            <BadgeDetails
              badge={selectedBadge}
              onClose={() => setSelectedBadge(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameAchievementSystem;
