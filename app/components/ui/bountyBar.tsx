"use client";

import React from "react";

interface VerticalBountyBarProps {
  value: number;
  max: number;
  height?: number;
}

function VerticalBountyBar({
  value,
  max,
  height = 300,
}: VerticalBountyBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className="relative w-6 bg-gray-300 rounded-full mb-20 "
      style={{ height: `${height}px` }}
    >
      {/* yellow fill */}
      <div
        className="absolute bottom-0 w-full bg-yellow-400 rounded-full"
        style={{ height: `${percentage}%` }}
      >
        {/* black dot on top of fill */}
        <div className="w-6 h-2 bg-black rounded-full mx-auto shadow rounded-full" />
      </div>
    </div>
  );
}

export default VerticalBountyBar;
