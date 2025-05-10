'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import './SunGlareEffect.css';

const SunGlareEffect: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="glare-effect-container">
      <div className="sun-element" />
      <div className="sun-glow-element" />
      <div className="hex-glare hex-1" />
      <div className="hex-glare hex-2" />
      <div className="hex-glare hex-3" />
      <div className="lens-glare-1" />
      <div className="lens-glare-2" />
      <div className="sparkle sparkle-1" />
      <div className="sparkle sparkle-2" />
      <div className="sparkle sparkle-3" />
      <div className="sparkle sparkle-4" />
      <div className="sparkle sparkle-5" />
    </div>
  );
};

export default SunGlareEffect;
