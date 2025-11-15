"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaMusic, FaBrain, FaDatabase, FaWaveSquare, FaLayerGroup, FaArrowRight } from "react-icons/fa";

export default function SomaliGenAIPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const} },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
     {/* BACKGROUND LAYER */}
     <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-40"
          style={{
            backgroundImage: `url('/images/background/music-notes-flow.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos-950/80 via-cosmos-950/90 to-cosmos-950" />
      </div>

      {/* 2. CONTENT LAYER */}
      <section className="relative z-10 container mx-auto px-4 py-16 pt-24 min-h-[80vh]">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-purple-800 to-teal-700 dark:from-white dark:via-neon-purple dark:to-neon-cyan leading-tight tracking-tighter">
            QaraamiGen AI
          </h1>
          <p className="text-xl text-cyan-600 dark:text-neon-cyan font-mono tracking-[0.3em] uppercase font-bold">
            From Oral Heritage to Digital Music Systems
          </p>
        </motion.div>

        {/* THE PROBLEM STATEMENT */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-20 p-10 rounded-[2.5rem] shadow-2xl border 
                     bg-white/5 border-gray-200 
                     dark:bg-white/5 dark:border-white/10 backdrop-blur-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            The Challenge: <span className="text-purple-600 dark:text-neon-purple">Digital Extinction</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
            Somali music, particularly the <strong className="text-gray-900 dark:text-white font-black">Qaraami</strong> tradition, relies on complex pentatonic scales and microtonal nuances that Western MIDI standards cannot capture. It is an oral tradition, largely undocumented in sheet music.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
            As the masters of this tradition pass away, we risk losing centuries of cultural heritage. <strong className="text-cyan-600 dark:text-neon-cyan underline decoration-cyan-500/30 underline-offset-4">Current AI models are trained on Western datasets.</strong> They cannot generate, understand, or preserve the soul of Somali music.
          </p>
        </motion.div>

        {/* THE SOLUTION / ARCHITECTURE VISUALIZER */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <h2 className="text-4xl font-black mb-16 text-center text-gray-900 dark:text-white tracking-tight">System Architecture</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 transform -translate-y-1/2"></div>

            <motion.div variants={cardVariants} className="p-8 rounded-3xl border shadow-2xl bg-white/5 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/50 transition-colors group">
              <FaDatabase className="text-4xl text-purple-600 dark:text-neon-purple mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Data Collection</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Encoding raw audio from Oud recordings into custom symbolic representations.</p>
            </motion.div>

            <motion.div variants={cardVariants} className="p-8 rounded-3xl border shadow-2xl bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30 transition-colors group">
              <FaWaveSquare className="text-4xl text-gray-700 dark:text-white mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Scale Analysis</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">DSP algorithms to detect and map microtonal Qaraami intervals.</p>
            </motion.div>

            <motion.div variants={cardVariants} className="p-8 rounded-3xl border shadow-2xl bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30 transition-colors group">
              <FaBrain className="text-4xl text-gray-700 dark:text-white mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Model Training</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Experimenting with LSTMs and Transformers to learn rhythmic probabilities.</p>
            </motion.div>

            <motion.div variants={cardVariants} className="p-8 rounded-3xl border shadow-2xl bg-white/5 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/50 transition-colors group">
              <FaMusic className="text-4xl text-cyan-600 dark:text-neon-cyan mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Generation</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Synthesizing new melodies that respect traditional structural rules.</p>
            </motion.div>
          </div>
        </motion.div>

         {/* NEW SECTION: MIR VISUALIZATION */}
         <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Current Progress: <span className="text-cyan-600 dark:text-neon-cyan">AI Transcription Engine</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 bg-black/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5">
              <p className="text-gray-300 text-lg leading-relaxed">
                I have successfully built an <strong className="text-white">end-to-end MIR pipeline</strong> in Python that ingests raw audio and outputs standard MusicXML.
              </p>
              <ul className="space-y-4 text-gray-400 font-mono text-sm">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><FaWaveSquare /></div> 
                  Source Separation (HPSS)
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><FaBrain /></div> 
                  pYIN Pitch Detection
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><FaMusic /></div> 
                  Automated Quantization
                </li>
              </ul>
              
              <div className="pt-6">
                <a 
                  href="/projects/Qaraami-Gen-Ai" 
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-full text-neon-cyan hover:bg-white hover:text-black font-black transition-all"
                >
                  View Transcription Code <FaArrowRight className="ml-3" />
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/audio/mir-transcription-proof.png" 
                alt="AI Generated Sheet Music from Somali Audio"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md">
                <p className="text-[10px] text-center text-neon-cyan font-mono uppercase tracking-[0.3em]">
                  Inference Output: Raw .musicxml Generated via Python
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* THE RESEARCH GOAL */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center"
        >
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tight">
              Research Trajectory
            </h2>
            <ul className="space-y-6">
              {[
                { time: "Short Term", text: "Complete the first annotated dataset of Somali Oud Scales (MIDI + Audio).", color: "text-cyan-400" },
                { time: "At Graduate Study", text: "Leverage advanced resources to move from statistical models to Deep Learning architectures that handle microtonal improvisation.", color: "text-purple-400" },
                { time: "Long Term", text: 'Build "QaraamiGen Studio"—a tool for Somali artists to collaborate with AI, preserving the past while composing the future.', color: "text-blue-400" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <FaArrowRight className={`${item.color} mt-1 flex-shrink-0 text-xs`} />
                  <p className="text-gray-400 leading-relaxed italic text-sm">
                    <strong className="text-white uppercase tracking-widest text-xs block mb-1">{item.time}</strong>
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 md:order-2 relative h-80 rounded-[2.5rem] border overflow-hidden flex items-center justify-center group
                          bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
              <FaLayerGroup className="text-7xl text-white/10 group-hover:text-white/40 transition duration-700 transform group-hover:rotate-12 group-hover:scale-125" />
              <p className="absolute bottom-8 text-[10px] text-gray-500 font-mono uppercase tracking-widest">Model Architecture Visualization</p>
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 text-center"
        >
           <p className="text-gray-500 font-light italic mb-10 text-xl">
             &quot;The future of tradition is not in repetition, but in evolution.&quot;
           </p>
           <a href="/projects/code-test" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full text-white font-black text-lg shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all uppercase tracking-widest">
              <FaMusic className="mr-3" /> Listen to Initial Prototypes
           </a>
        </motion.div>
      </section>
    </div>
  );
}