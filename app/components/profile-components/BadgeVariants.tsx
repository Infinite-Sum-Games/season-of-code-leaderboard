import { Lock } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ExpandedProps {
  title: string;
  description: string;
  date: string;
  icon: string;
  tier: string;
  progress?: number;
}

interface CollapsedProps {
  title: string;
  icon: string;
  tier: string;
}

interface LockedProps {
  title: string;
  icon: string;
  tier: string;
  progress?: number;
}

export function Expanded({
  title,
  description,
  date,
  icon,
  tier,
  progress,
}: ExpandedProps) {
  const tierStyles = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-500 to-yellow-700 animate-holographic',
    diamond: 'from-blue-400 to-purple-600 animate-holographic-diamond',
  };

  return (
    <div className="relative w-[200px] mx-auto overflow-visible group transition-all duration-500">
      {/* Icon with Glow and Particle Effect */}
      <div className="relative z-20 w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden shadow-2xl duration-500 group-hover:shadow-[0_0_30px_10px_rgba(99,102,241,0.8)] group-hover:-translate-y-2 group-hover:scale-110 transition-transform">
        <Image
          src={icon}
          alt="Badge Icon"
          width={112}
          height={112}
          className="object-cover w-full h-full transition-all duration-500 group-hover:brightness-150"
        />
        {(tier === 'gold' || tier === 'diamond') && (
          <div className="absolute inset-0 particle-effect" />
        )}
      </div>

      {/* Card with SVG Background and Holographic Effect */}
      <div
        className={`relative w-[200px] h-[240px] rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/30 overflow-hidden duration-500 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-all bg-gradient-to-br ${
          tierStyles[tier as keyof typeof tierStyles]
        }`}
      >
        {/* SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-500"
          viewBox="0 0 200 240"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle"
        >
          <title id="ribbonTitle">Dynamic wave background</title>
          {Array.from({ length: 20 }).map((_, i) => {
            const yOffset = i * 12;
            const pathData = Array.from({ length: 41 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 20) * 8 +
                  Math.cos((xPos + i * 10) / 15) * 4;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');
            return (
              <path
                key={`wave-expanded-path-${i}-${Math.random()
                  .toString(36)
                  .substring(2, 9)}`}
                d={pathData}
                stroke={`rgba(255, 255, 255, ${0.1 + i * 0.02})`}
                strokeWidth="1.5"
                fill="none"
                className="animate-wave"
              />
            );
          })}
        </svg>

        {/* Content */}
        <div className="relative flex flex-col gap-3 w-full h-full text-center text-white px-4 pt-16 pb-4">
          <div className="text-xl font-bold tracking-wide drop-shadow-lg transition-colors duration-300">
            {title}
          </div>
          <div className="text-xs tracking-wider drop-shadow-md opacity-90">
            {date}
          </div>
          <div className="text-sm leading-relaxed tracking-wide drop-shadow-md overflow-y-auto max-h-20">
            {description}
          </div>
          {progress !== undefined && (
            <div className="mt-auto">
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs mt-2 text-blue-200">
                {progress}% to Unlock
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Collapsed({ title, icon, tier }: CollapsedProps) {
  const tierStyles = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-500 to-yellow-700 animate-holographic',
    diamond: 'from-blue-400 to-purple-600 animate-holographic-diamond',
  };

  return (
    <div className="relative w-[140px] mx-auto overflow-visible group transition-all duration-500">
      {/* Icon with Subtle Glow */}
      <div className="relative z-20 w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-xl duration-500 group-hover:shadow-[0_0_20px_5px_rgba(99,102,241,0.6)] group-hover:-translate-y-2 group-hover:scale-105 transition-transform">
        <Image
          src={icon}
          alt="Badge Icon"
          width={96}
          height={96}
          className="object-cover w-full h-full transition-all duration-500"
        />
      </div>
      <div
        className={`relative w-[140px] h-[100px] rounded-xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all bg-gradient-to-br ${
          tierStyles[tier as keyof typeof tierStyles]
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-500"
          viewBox="0 0 140 100"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle1"
        >
          <title id="ribbonTitle1">Dynamic wave background</title>
          {Array.from({ length: 8 }).map((_, i) => {
            const yOffset = i * 12;
            const pathData = Array.from({ length: 29 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 20) * 6 +
                  Math.cos((xPos + i * 10) / 15) * 3;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');
            return (
              <path
                key={`wave-collapsed-path-${i}-${Math.random()
                  .toString(36)
                  .substring(2, 9)}`}
                d={pathData}
                stroke={`rgba(255, 255, 255, ${0.1 + i * 0.02})`}
                strokeWidth="1.5"
                fill="none"
                className="animate-wave"
              />
            );
          })}
        </svg>

        <div className="relative flex items-center justify-center h-full text-center text-base font-semibold tracking-wide drop-shadow-md transition-colors duration-300 px-4">
          {title}
        </div>
      </div>
    </div>
  );
}

export function Locked({ title, icon, tier, progress }: LockedProps) {
  const tierStyles = {
    bronze: 'from-amber-600/30 to-amber-800/30',
    silver: 'from-gray-400/30 to-gray-600/30',
    gold: 'from-yellow-500/30 to-yellow-700/30',
    diamond: 'from-blue-400/30 to-purple-600/30',
  };

  return (
    <div className="relative w-[140px] mx-auto overflow-visible group transition-all duration-500">
      {/* Icon with Locked Overlay */}
      <div className="relative z-20 w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden duration-500 group-hover:scale-105 transition-transform">
        <div className="relative w-full h-full">
          <Image
            src={icon}
            alt="Badge Icon"
            fill
            className="object-cover blur-[1px] grayscale opacity-60 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
            <span className="bg-black/60 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1 transition-all duration-500">
              <Lock className="w-4 h-4 inline-block mr-1" />
              Locked
            </span>
          </div>
        </div>
      </div>

      {/* Card with Dimmed SVG Background */}
      <div
        className={`relative w-[140px] h-[120px] rounded-xl bg-white/5 backdrop-blur-md shadow-md border border-white/10 duration-500 group-hover:scale-105 transition-all bg-gradient-to-br ${
          tierStyles[tier as keyof typeof tierStyles]
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-500"
          viewBox="0 0 140 120"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle2"
        >
          <title id="ribbonTitle2">Dynamic wave background</title>
          {Array.from({ length: 8 }).map((_, i) => {
            const yOffset = i * 15;
            const pathData = Array.from({ length: 29 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 20) * 6 +
                  Math.cos((xPos + i * 10) / 15) * 3;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');
            return (
              <path
                key={`wave-locked-path-${i}-${Math.random()
                  .toString(36)
                  .substring(2, 9)}`}
                d={pathData}
                stroke={`rgba(255, 255, 255, ${0.05 + i * 0.01})`}
                strokeWidth="1.5"
                fill="none"
                className="animate-wave"
              />
            );
          })}
        </svg>

        <div className="relative text-center text-gray-400 text-base font-semibold tracking-wide pt-8 px-4">
          {title}
        </div>
        {progress !== undefined && (
          <div className="absolute bottom-4 w-full px-4">
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div
                className="bg-blue-500/50 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs mt-2 text-gray-500 text-center">
              {progress}% to Unlock
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
