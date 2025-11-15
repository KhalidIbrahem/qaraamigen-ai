"use client";

import { motion } from "framer-motion";
import { FaArrowLeft, FaCode, FaFlask, FaUpload, FaMusic, FaHammer } from "react-icons/fa";
import Link from "next/link";

export default function ProjectDetail() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100 pb-20 overflow-hidden">
      
      {/* 1. BACKGROUND LAYER: Music Notes & Flowing Lines */}
      <div className="fixed inset-0 z-0 pointer-events-none">
    
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-40"
          style={{
            backgroundImage: `url('/images/background/music-notes-flow.png')`, // Replace with your image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Deep Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos-950/80 via-cosmos-950/90 to-cosmos-950" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10">
        
        {/* Header Section */}
        <section className="pt-20 pb-10 text-center px-4">
          <Link href="/about" className="inline-flex items-center text-neon-cyan mb-6 hover:underline font-bold transition-all hover:gap-2">
            <FaArrowLeft className="mr-2" /> Back to About Me
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
          >
            AI Music Transcription
          </motion.h1>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Bridging the gap between raw Somali Oud recordings and digital sheet music.
          </p>
        </section>

        <main className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Mission & Technicals */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Status Banner */}
              <motion.div 
                variants={sectionVariants} initial="hidden" whileInView="visible"
                className="bg-blue-600/10 backdrop-blur-md border border-blue-500/30 p-6 rounded-3xl flex items-start gap-5 shadow-2xl"
              >
                <div className="p-3 bg-blue-500/20 rounded-2xl animate-pulse">
                  <FaHammer className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <h3 className="text-blue-400 font-bold text-lg uppercase tracking-widest">Model Training in Progress</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    I am currently training deep learning models specifically optimized for the 5-note Somali pentatonic scale. 
                    The transcription engine is learning the microtonal nuances of the Oud to provide professional notation.
                  </p>
                </div>
              </motion.div>

              {/* Transcription Workflow */}
              <motion.section 
                variants={sectionVariants} initial="hidden" whileInView="visible"
                className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaMusic className="text-cyan-400" /> Transform Audio into Notes
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { step: "1", title: "Upload", text: "Drop your MP3, WAV, or YouTube link." },
                    { step: "2", title: "Analyze", text: "AI identifies notes, tempo, and scales." },
                    { step: "3", title: "Export", text: "Download PDF, MIDI, or MusicXML." }
                  ].map((item, i) => (
                    <div key={i} className="text-center md:text-left">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black mb-4 mx-auto md:mx-0 shadow-lg shadow-cyan-500/20">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-gray-100 mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Technical Implementation */}
              <motion.section 
                variants={sectionVariants} initial="hidden" whileInView="visible"
                className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <FaCode className="text-neon-blue" /> Engineering Architecture
                </h2>
                <p className="text-gray-400 mb-6 italic">
                  &quot;Training the system to hear the silence between the notes.&quot;
                </p>
                <div className="bg-cosmos-900/80 p-6 rounded-2xl font-mono text-sm text-blue-300 border border-white/5 shadow-inner">
                  <p className="text-gray-500 mb-2"># Future Transcription API Endpoint</p>
                  <p>const transcription = await QaraamiGen.transcribe(audioData, &#123;</p>
                  <p className="pl-6">scale: &apos;somali_pentatonic&apos;,</p>
                  <p className="pl-6">instrument: &apos;oud&apos;</p>
                  <p>&#125;);</p>
                </div>
              </motion.section>
            </div>

            {/* Right Column: Progress & Placeholder */}
            <div className="space-y-8">
              
              {/* Progress Log */}
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <FaFlask className="text-purple-400" /> Research Milestones
                </h3>
                <div className="space-y-6">
                  {[
                    { label: "Oud Audio Dataset", val: 85, color: "bg-green-500" },
                    { label: "Model Training", val: 43, color: "bg-blue-500" },
                    { label: "Web UI Integration", val: 15, color: "bg-purple-500" }
                  ].map((p, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-tighter">
                        <span>{p.label}</span>
                        <span>{p.val}%</span>
                      </div>
                      <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.val}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`${p.color} h-full shadow-[0_0_10px_rgba(255,255,255,0.2)]`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Uploader Placeholder */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-cosmos-900/40 backdrop-blur-sm p-10 rounded-3xl border-2 border-dashed border-white/10 text-center group cursor-not-allowed"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
                  <FaUpload className="text-3xl text-gray-600 group-hover:text-gray-400" />
                </div>
                <h4 className="text-gray-300 font-bold mb-2">Upload Audio</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The audio interface is currently disabled. It will be enabled once the Somali AI model reaches beta testing.
                </p>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}







