'use client';
import type React from 'react';
import './FlareEffect.css';

const FlareEffect: React.FC = () => {
  return (
    <div className="flare-container">
      <div className="sun" />
      <div className="circle-1" />
      <div className="circle-2" />
    </div>
  );
};

export default FlareEffect;
