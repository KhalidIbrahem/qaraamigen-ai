"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWaveSquare, FaRobot, FaPlay, FaMusic, FaSlidersH, FaFingerprint } from "react-icons/fa";


const STATIC_WAVEFORM = [
  20, 45, 30, 80, 50, 90, 30, 40, 60, 20, 
  45, 30, 80, 50, 90, 30, 40, 60, 20, 45, 
  30, 80, 50, 90, 30
];

export default function GenerativeMusicFlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Physics
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 100]); 
  const yMiddle = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const yFront = useTransform(scrollYProgress, [0, 1], [100, -200]);

  
  const floatingTransition = {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center md:justify-end perspective-1000">
      
      {/* --- CARD 1: BACK LAYER  --- */}
      <motion.div
        style={{ y: yBack, zIndex: 10, scale: 0.9 }}
        className="absolute left-0 md:left-10 top-0 w-80 md:w-[400px] bg-cosmos-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md opacity-60"
      >
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <span className="text-sm text-gray-400 font-mono flex items-center gap-3">
            <FaFingerprint className="text-neon-cyan" /> INPUT SOURCE
          </span>
          <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-1 rounded">WAV</span>
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300 font-mono">
                <span>Kaban_Archive_1987.wav</span>
                <span>03:14</span>
            </div>
            
            {/* WAVEFORM VISUALIZATION */}
            <div className="h-16 flex items-center gap-1.5 opacity-60">
                {STATIC_WAVEFORM.map((height, i) => (
                    <div 
                        key={i} 
                        className="w-2 bg-neon-cyan rounded-full" 
                        style={{ height: `${height}%`}} 
                    />
                ))}
            </div>
        </div>
      </motion.div>


      {/* --- CARD 2: MIDDLE LAYER  --- */}
      <motion.div
        style={{ y: yMiddle, zIndex: 20 }}
        animate={{ y: [0, -15, 0] }}
        transition={floatingTransition}
        className="absolute left-8 md:left-24 top-24 w-80 md:w-[450px] bg-[#1a1a2e] border border-neon-purple/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(124,58,237,0.2)]"
      >
         <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <span className="text-sm text-gray-400 font-mono flex items-center gap-3">
            <FaRobot className="text-neon-purple" /> QARAAMI_GEN_MODEL
          </span>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>

        <div className="space-y-4 font-mono text-xs md:text-sm">
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-gray-400">Scale Recognition</span>
                <span className="text-neon-purple font-bold">Bati_Major</span>
            </div>
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-gray-400">Tempo Drift</span>
                <span className="text-neon-purple font-bold">Normalized</span>
            </div>
            
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
                <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                />
            </div>
        </div>
      </motion.div>


      {/* --- CARD 3: FRONT LAYER  --- */}
      <motion.div
        style={{ y: yFront, zIndex: 30 }}
        className="absolute right-0 md:right-10 top-60 w-72 md:w-[380px] bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
      >
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -right-3 -top-3 bg-neon-cyan text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/50"
        >
            Process Complete
        </motion.div>

        <div className="text-center mb-6 pt-2">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-neon-cyan to-neon-purple rounded-2xl flex items-center justify-center shadow-lg mb-4 ring-1 ring-white/20">
                <FaMusic className="text-white text-3xl" />
            </div>
            <h3 className="text-white font-bold text-xl">Somali Synth V2</h3>
            <p className="text-gray-400 text-sm mt-1">Generated • 2025</p>
        </div>

        <div className="flex justify-center items-center gap-6 mt-6 pb-2">
            <FaSlidersH className="text-gray-500 text-lg hover:text-white transition cursor-pointer" />
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition text-black pl-1">
                <FaPlay size={20} />
            </div>
            <FaWaveSquare className="text-gray-500 text-lg hover:text-white transition cursor-pointer" />
        </div>
      </motion.div>

    </div>
  );
}