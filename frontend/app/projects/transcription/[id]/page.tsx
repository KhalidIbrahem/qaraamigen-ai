"use client";

import { useSearchParams, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaMusic, FaCheckCircle, FaDownload, FaUndo, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function TranscriptionResult() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const text = searchParams.get("text") || "No transcription data received.";
  const fileName = searchParams.get("file") || "Archived File";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-40"
          style={{ backgroundImage: `url('/images/background/music-notes-flow.png')`, backgroundSize: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos-950/90 via-cosmos-950 to-cosmos-950" />
      </div>

      <main className="relative z-10 container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <Link href="/projects/Qaraami-Gen-Ai" className="inline-flex items-center text-cyan-400 mb-8 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
          <FaArrowLeft className="mr-2" /> Start New Session
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-3xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaCheckCircle className="text-green-400 text-2xl" />
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Analysis Complete</h1>
              </div>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] ml-9">Session ID: {params.id}</p>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">Transcription Output ({fileName})</h3>
            <div className="bg-black/40 p-8 md:p-12 rounded-[2.5rem] border border-white/5 font-mono text-lg md:text-xl leading-relaxed text-gray-300 min-h-[300px] shadow-inner selection:bg-cyan-500 selection:text-black">
              {text}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-neon-cyan transition-all shadow-xl flex items-center justify-center gap-3">
              <FaDownload /> Export MusicXML
            </button>
            <button className="py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <FaMusic /> View Notation
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}