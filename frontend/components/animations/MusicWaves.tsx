'use client';

import React, { useEffect, useState, CSSProperties } from 'react';

interface Note {
  id: number;
  iconIndex: number;
  left: string;
  duration: string;
  delay: string;
  swayDuration: string;
  opacity: number;
  size: string;
}

interface CustomCSS extends CSSProperties {
  '--duration'?: string;
  '--sway-duration'?: string;
  '--note-opacity'?: number;
  '--delay'?: string;
}

const ICON_PATHS = [
  "M26.6 6.6c-2.4-2.8-5.6-3.8-7.8-3.8-3.2 0-6.4 1.8-7.8 5.4-1 2.8-.2 6.2 1.6 8.8 1.4 2 3.4 3.4 5.2 5.2-2.8 1.2-5.6 2.6-7.8 4.8-2.6 2.6-3.8 6-3.4 9.6.4 3.6 2.6 6.8 5.8 8.4 3.2 1.6 7.2 1.6 10.6.2 3.2-1.4 5.6-4.4 6.2-7.8.6-3.2-.6-6.6-3-9-2-2-4.8-3-7.6-3.2-.2-3.8.8-7.4 3-10.6 1.4-2 3.2-3.6 5-5.4 1.2-1.2 2-3 1.8-4.8-.2-1.6-1.2-3.2-2.6-4.2zM21 39.4c-1.8 1.6-4.4 1.8-6.6.8-2-1-3.2-3.2-3-5.4.2-2.2 1.6-4.2 3.4-5.6 1.6-1.2 3.6-1.8 5.6-1.8 1.4 3.4 1.8 7.4.6 10.8z",
  "M28 2h-6v20.4c-1.6-1.2-3.6-2-5.6-1.8-4.4.4-7.8 4.2-7.4 8.6.4 4.4 4.2 7.8 8.6 7.4 3.8-.4 7-3.2 7.4-7V10h3c2.2 0 4-1.8 4-4s-1.8-4-4-4z",
  "M12 2C10.9 2 10 2.9 10 4v16.4C8.4 19.2 6.4 18.4 4.4 18.8c-4.4.4-7.8 4.2-7.4 8.6.4 4.4 4.2 7.8 8.6 7.4 3.8-.4 7-3.2 7.4-7V2z"
];

const MusicWaves = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const newNotes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      iconIndex: Math.floor(Math.random() * ICON_PATHS.length),
      left: Math.floor(Math.random() * 90) + 5 + '%', 
      duration: Math.floor(Math.random() * 10) + 20 + 's', // Slow float
      // FIX 1: Negative delay ensures animations are ALREADY moving when page loads
      delay: '-' + Math.floor(Math.random() * 20) + 's', 
      swayDuration: Math.floor(Math.random() * 3) + 4 + 's',
      opacity: Math.random() * 0.5 + 0.2, 
      size: Math.floor(Math.random() * 20) + 30 + 'px', 
    }));
    setNotes(newNotes);
  }, []);

  return (
    // FIX 2: Use dynamic Tailwind variable 'bg-cosmos-950' instead of hardcoded hex
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-cosmos-950 transition-colors duration-500">
      
      {/* FIX 3: Hide the dark night gradient when in Light Mode */}
      <div className="absolute inset-0 bg-night-gradient opacity-0 dark:opacity-90 transition-opacity duration-500" />

      {notes.map((note) => (
        <div
          key={note.id}
          // FIX 4: Dark icons in Light Mode (text-cosmos-900), White icons in Dark Mode (dark:text-white)
          className="music-wave absolute text-cosmos-900 dark:text-white"
          style={
            {
              left: note.left,
              width: note.size,
              height: note.size,
              '--duration': note.duration,
              '--sway-duration': note.swayDuration,
              '--note-opacity': note.opacity,
              '--delay': note.delay,
            } as CustomCSS
          }
        >
          {/* fill-current uses the text color defined in className above */}
          <svg viewBox="0 0 50 50" className="w-full h-full fill-current drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            <path d={ICON_PATHS[note.iconIndex]} />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default MusicWaves;