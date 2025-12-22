"use client";

import { useRef, useState } from 'react'
import { motion} from "framer-motion";
import Image from "next/image"; 
import CodeBlock from "@/components/ui/CodeBlock";
import { FaCodeBranch, FaVolumeUp, FaFileCode, FaPlayCircle, FaMusic, FaGuitar, FaKeyboard } from "react-icons/fa"; 

function VideoCard({ src, title, icon }: { src: string, title: string, icon: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl border border-white/10 group bg-black/40 backdrop-blur-md">
      <video
        ref={videoRef}
        src={src}
        loop
        muted={false}
        playsInline
        onClick={handlePlay}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {!isPlaying && (
        <div 
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/20 transition-all z-10"
        >
          <FaPlayCircle className="text-white/80 text-6xl drop-shadow-lg group-hover:scale-110 transition-transform" />
        </div>
      )}

      {/* Title Label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pointer-events-none">
        <p className="text-white text-sm font-bold flex items-center gap-2 italic">
          {icon} {title}
        </p>
      </div>
    </div>
  );
}

export default function TechnicalPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 as const } },
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
      <section className="relative z-10 container mx-auto px-4 pt-32 pb-16 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-neon-cyan to-neon-purple tracking-tighter">
            Technical Challenges
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light italic">
            Combining algorithmic rigor with musical performance to preserve the Somali tradition.
          </p>
        </motion.div>

        {/* OVERVIEW SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-4xl mx-auto text-lg text-gray-300 space-y-6 mb-20 p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl"
        >
          <p className="leading-relaxed">
            This page details the technical coding challenge for my application. The task was to demonstrate proficiency in <strong className="text-neon-cyan">algorithmic problem-solving and DSP concepts</strong> without using external audio libraries.
          </p>
          <p className="leading-relaxed font-light italic">
            My solution uses Python (NumPy) to synthesize a &quot;Qaraami melody&quot;—a stylistic homage to traditional Somali music. This merges my engineering expertise with my cultural heritage.
          </p>
          <div className="flex justify-center items-center gap-4 pt-6 border-t border-white/5">
            <FaCodeBranch className="text-neon-purple text-2xl" />
            <a
              href="/projects/Qaraami-Gen-Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:text-white transition-colors font-black uppercase tracking-widest text-sm"
            >
              View Full Python Project on GitHub
            </a>
          </div>
        </motion.div>

        {/* ALGORITHMIC CORE */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-5xl mx-auto mb-24 p-10 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">
            The Algorithmic Core
          </h2>
          <p className="text-gray-400 mb-10 font-mono text-sm">
            Writing robust Python code to manage digital audio synthesis, custom envelopes, and musical structures.
          </p>
          <motion.div
       
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-inner border border-white/5 group"
          >
            <Image
              src="/images/python-code-example.jpg"
              alt="Illustrative Python Code"
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-110 transition-transform duration-1000 ease-in-out opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
              <p className="text-white text-xl font-bold flex items-center gap-3 italic">
                <FaFileCode className="text-neon-cyan" /> Python Script for Audio Generation
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* AUDIO RESULTS */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-4xl mx-auto mb-32 p-10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-white">
            Generated Audio Results
          </h2>
          
          <div className="grid gap-4">
              {[
                  { file: "/audio/somali_melody.wav", label: "Basic Melody Generation" },
                  { file: "/audio/somali_fm_swing.wav", label: "FM Synthesis with Swing" },
                  { file: "/audio/somali_studio_mix.wav", label: "Full Studio Mix (Python)" },
                  { file: "/audio/somali_masterpiece.wav", label: "Real Oud String Extraction" },
              ].map((track, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all group">
                      <span className="flex items-center text-gray-300 font-bold mb-4 md:mb-0 italic group-hover:text-white transition-colors">
                          <FaVolumeUp className="text-neon-cyan mr-3" /> {track.label}
                      </span>
                      <audio controls className="w-full md:w-1/2 h-10 opacity-70 hover:opacity-100 transition-opacity" src={track.file} />
                  </div>
              ))}
          </div>
        </motion.div>

        {/* PORTFOLIO SUBMISSION VIDEO SECTION */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                Portfolio Submission
              </h2>
              <div className="max-w-3xl mx-auto p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 italic text-gray-400 leading-relaxed text-sm">
                This performance demonstrates my current musical ability. It represents my ongoing effort to preserve the Somali Qaraami repertoire through structured musical interpretation.
                <div className="mt-4 font-mono text-neon-cyan uppercase text-[10px] tracking-widest not-italic">
                  Recording Date: 07, 2023 | Instrument: Oud
                </div>
              </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              <VideoCard 
                  src="/videos/oud-solo.mp4" 
                  title="Oud Improvisation (Othaman)" 
                  icon={<FaGuitar className="text-neon-purple" />} 
              />
              <VideoCard 
                  src="/videos/piano-solo.mp4" 
                  title="Piano Composition" 
                  icon={<FaKeyboard className="text-neon-blue" />} 
              />
              <VideoCard 
                  src="/videos/ensemble.mp4" 
                  title="Somali Rhythmic Study" 
                  icon={<FaMusic className="text-neon-cyan" />} 
              />
          </div>
        </motion.div>

        {/* NUMPY CODE DEEP DIVE */}
        <div className="max-w-6xl mx-auto mb-32 pt-20 border-t border-white/10">
          <div className="text-center mb-16">
              <span className="px-5 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-[10px] font-black tracking-[0.3em] uppercase mb-6 inline-block border border-neon-cyan/20">
                Somali_Pentatonic_Logic
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Built from Scratch (Pure NumPy)
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-light italic">
                To demonstrate my grasp of Digital Signal Processing, I built this synthesis engine using <strong className="text-white">zero external audio libraries</strong>.
              </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">
                    1. The Physics (Karplus-Strong)
                </h3>
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                  <CodeBlock 
                      filename="engine.py"
                      code={`def oud_string(freq, duration):
    """
    Simulates a plucked string using 
    Ring Buffer + Low Pass Filter.
    No samples. Pure math.
    """
    N = int(SAMPLE_RATE / freq)
    pluck = np.random.uniform(-1, 1, N)
    output = np.zeros(samples)
    current = 0
    
    for i in range(samples):
        output[i] = pluck[current]
        avg = 0.994 * 0.5 * (pluck[current] + pluck[(current + 1) % N])
        pluck[current] = avg
        current = (current + 1) % N
        
    return output`} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">
                    2. The &quot;Camel Gait&quot; Rhythm
                </h3>
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                  <CodeBlock 
                      filename="sequencer.py"
                      code={`# The Dhaanto "Gallop"
# We don't use a 4/4 grid. 
# We use Swing Quantization.

SWING_DELAY = 0.02 # 20ms offset

if step % 2 != 0:
   # Delay the off-beat to create
   # the "limping" feel of a camel
   time += SWING_DELAY
   
play_note(freq, time)`} 
                  />
                </div>
              </div>
          </div>
        </div>

        {/* CLOSING FOOTER */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto text-center pt-10 pb-20"
        >
          <p className="text-2xl font-light italic text-gray-400 leading-relaxed">
            &quot;This challenge solidified my commitment to exploring how computational
            methods can not only innovate in music creation but also profoundly
            connect with and enrich cultural expressions.&quot;
          </p>
        </motion.div>
      </section>
    </div>
  );
}