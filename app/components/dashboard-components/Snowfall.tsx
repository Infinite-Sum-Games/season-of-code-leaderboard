"use client";

import { useEffect } from "react";

const Snowfall: React.FC = () => {
  useEffect(() => {
    const createSnowflakes = () => {
      const numberOfSnowflakes = 50; // Adjust for better performance
      const container = document.getElementById("snowfall-container");
      if (!container) return;

      for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        // Randomize properties
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `${Math.random() * -20 - 10}px`; // Start slightly above the screen
        snowflake.style.width = `${5 + Math.random() * 10}px`;
        snowflake.style.height = snowflake.style.width; // Make them circular
        snowflake.style.animationDelay = `${Math.random() * 10}s`; // Random delay
        snowflake.style.animationDuration = `${8 + Math.random() * 10}s`; // Adjust speed
        snowflake.style.opacity = `${0.4 + Math.random() * 0.6}`;

        container.appendChild(snowflake);
      }
    };

    createSnowflakes();

    // Cleanup function
    return () => {
      const container = document.getElementById("snowfall-container");
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      id="snowfall-container"
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden -z-10"
    ></div>
  );
};

export default Snowfall;
