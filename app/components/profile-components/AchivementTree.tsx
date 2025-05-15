import { useState } from 'react';
import BadgeNode from './BadgeNode';
import { categories } from './data';
import type { Badge, Category, Connection } from './types';

// AchievementTree Component
export default function AchievementTree({
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
