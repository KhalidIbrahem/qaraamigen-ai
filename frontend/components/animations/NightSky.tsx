'use client'
import React from 'react';

const NightSky = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-night-gradient overflow-hidden -z-50 pointer-events-none">
      
      {/* The Moon */}
      {/* Tailwind breakdown: absolute pos, size, rounded-full, custom drop-shadow, animation */}
      <div className="absolute top-[60px] right-[60px] w-20 h-20 rounded-full bg-transparent 
                      shadow-[12px_-12px_0_0_#ffffff] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] 
                      animate-moon-float" 
      />

      {/* Star Layer 1 (Small & Fast) */}
      <div className="stars-small opacity-50 animate-star-move-fast" />

      {/* Star Layer 2 (Medium & Mid Speed) */}
      <div className="stars-medium opacity-70 animate-star-move-mid" />

      {/* Star Layer 3 (Large & Slow) */}
      <div className="stars-large opacity-90 animate-star-move-slow" />
      
    </div>
  );
};

export default NightSky;