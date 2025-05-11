import Image from "next/image";
import React from "react";



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
      className={`relative w-[150px] mx-auto mt-20 overflow-visible`}
    >
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 z-10 rounded-full overflow-hidden">
        <Image
          src={icon}                                                                                    
          alt="Badge Icon"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative w-[150px] h-[300px] ribbon-shape overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? "M" : "L"}${xPos},${yPos}`;
              })
              .join(" ");

            return (
              <path
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
          <div className="text-2xl tracking-wide drop-shadow-md font-cinzel">
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
      className={`relative w-[100px] mx-auto mt-20 overflow-visible`}
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 z-10 rounded-full overflow-hidden">
        <Image
          src={icon}
          alt="Badge Icon"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative w-[100px] h-[150px] ribbon-shape overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? "M" : "L"}${xPos},${yPos}`;
              })
              .join(" ");

            return (
              <path
                key={i}
                d={pathData}
                stroke="rgba(25, 10, 40, 0.5)"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative top-10 text-center text-white text-lg tracking-wide drop-shadow-md font-[var(--font-cinzel)]">
          {title}
        </div>
      </div>
    </div>
  );
}

export function Locked({ title, icon }: LockedProps) {
  return (
    <div
      className={`relative w-[100px] mx-auto mt-20 overflow-visible`}
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full z-10 flex items-center justify-center overflow-hidden ">
        <Image
          src={icon}
          alt="Badge Icon"
          className="w-full h-full object-cover blur-[1px]"
          fill
        />
      </div>

      <div className="relative w-[100px] h-[150px] ribbon-shape overflow-hidden rounded-xl border border-pink-400/30 bg-gradient-to-br from-red-600/40 to-purple-800/40 backdrop-blur-md blur-[2px] shadow-[0_0_30px_rgba(255,0,255,0.5)]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 480"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const yOffset = i * 30 - 50;
            const pathData = Array.from({ length: 61 })
              .map((_, x) => {
                const xPos = x * 5;
                const yPos =
                  yOffset +
                  Math.sin(xPos / 30) * 15 +
                  Math.sin((xPos + i * 30) / 20) * 10;
                return `${x === 0 ? "M" : "L"}${xPos},${yPos}`;
              })
              .join(" ");

            return (
              <path
                key={i}
                d={pathData}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative top-10 text-center text-white text-lg font-[var(--font-cinzel)] tracking-wide">
          {title}
        </div>
      </div>
    </div>
  );
}
