'use client';
import { useState } from 'react';
import AchievementTree from './AchivementTree';
import BadgeDetails from './BadgeDetails';
import { categories } from './data';
import { achievementData } from './data';
import type { Badge, Category } from './types';

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
