import { Lock } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ExpandedProps {
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface CollapsedProps {
  title: string;
  icon: string;
}

interface LockedProps {
  title: string;
  icon: string;
}

export function Expanded({ title, description, date, icon }: ExpandedProps) {
  return (
    <div
      className={
        'relative w-[150px] mx-auto mt-4 overflow-visible group transition-all duration-700'
      }
    >
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 z-10 rounded-full overflow-hidden shadow-lg duration-700 group-hover:shadow-[0_0_24px_6px_rgba(99,102,241,0.5)] group-hover:-translate-y-2 group-hover:scale-105 transition-transform">
        <Image
          src={icon}
          alt="Badge Icon"
          width={96}
          height={96}
          className="object-cover w-full h-full transition-all duration-700"
        />
      </div>

      <div className="relative w-[150px] h-[300px] ribbon-shape overflow-hidden duration-700 group-hover:brightness-110 group-hover:shadow-xl group-hover:border-blue-400/40 group-hover:animate-pulse group-hover:scale-105 transition-transform">
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-700"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle"
        >
          <title id="ribbonTitle">Ribbon background decoration</title>
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');

            return (
              <path
                // biome-ignore lint/suspicious/noArrayIndexKey: key can be an array index here
                key={i}
                d={pathData}
                stroke="rgba(25, 10, 40, 0.5)"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative top-12 flex flex-col gap-3 w-full h-40 text-center text-white">
          <div className="text-2xl tracking-wide drop-shadow-md font-cinzel font-extrabold group-hover:text-blue-200 transition-colors duration-300">
            {title}
          </div>
          <div className="text-sm tracking-wider drop-shadow-sm font-cormorant">
            {date}
          </div>
          <div className="text-xs px-4 leading-relaxed tracking-wide drop-shadow-md font-spectral">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Collapsed({ title, icon }: CollapsedProps) {
  return (
    <div
      className={
        'relative w-[100px] mx-auto mt-2 overflow-visible group transition-all duration-700'
      }
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 z-10 rounded-full overflow-hidden shadow-lg duration-700 group-hover:shadow-[0_0_16px_4px_rgba(99,102,241,0.5)] group-hover:-translate-y-1 group-hover:scale-105 transition-transform">
        <Image
          src={icon}
          alt="Badge Icon"
          width={64}
          height={64}
          className="object-cover w-full h-full transition-all duration-700"
        />
      </div>

      <div className="relative w-[100px] h-[150px] ribbon-shape overflow-hidden duration-700 group-hover:brightness-110 group-hover:shadow-lg group-hover:border-blue-400/40 group-hover:animate-pulse group-hover:scale-105 transition-transform">
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-700"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle1"
        >
          <title id="ribbonTitle1">Ribbon background decoration</title>
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');

            return (
              <path
                // biome-ignore lint/suspicious/noArrayIndexKey: key can be an array index here
                key={i}
                d={pathData}
                stroke="rgba(25, 10, 40, 0.5)"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative top-10 text-center text-white text-lg tracking-wide drop-shadow-md font-bold group-hover:text-blue-200 transition-colors duration-300">
          {title}
        </div>
      </div>
    </div>
  );
}

export function Locked({ title, icon }: LockedProps) {
  return (
    <div
      className={
        'relative w-[100px] mx-auto mt-2 overflow-visible group transition-all duration-700'
      }
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full z-10 flex items-center justify-center overflow-hidden duration-700 group-hover:scale-105 transition-transform ">
        <Image
          src={icon}
          alt="Badge Icon"
          className="w-full h-full object-cover blur-[1px] grayscale opacity-60 transition-all duration-700"
          fill
        />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700">
          <span className="bg-black/60 text-white text-lg px-2 py-1 rounded-full flex items-center gap-1 transition-all duration-700">
            <Lock className="w-4 h-4 inline-block mr-1" />
            Locked
          </span>
        </div>
      </div>

      <div className="relative w-[100px] h-[150px] ribbon-shape overflow-hidden rounded-xl border border-pink-400/30 bg-gradient-to-br from-red-600/40 to-purple-800/40 backdrop-blur-md blur-[2px] shadow-[0_0_30px_rgba(255,0,255,0.5)] duration-700 group-hover:scale-105 transition-transform">
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-700"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
          aria-labelledby="ribbonTitle2"
        >
          <title id="ribbonTitle2">Ribbon background decoration</title>
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? 'M' : 'L'}${xPos},${yPos}`;
              })
              .join(' ');

            return (
              <path
                // biome-ignore lint/suspicious/noArrayIndexKey: key can be an array index here
                key={i}
                d={pathData}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative top-10 text-center text-white text-lg tracking-wide font-bold">
          {title}
        </div>
      </div>
    </div>
  );
}
