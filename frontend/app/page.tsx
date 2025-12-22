"use client";

import ProjectCard from "@/components/ui/ProjectCard";

import {
  FaCode,
  FaMusic,
  FaLightbulb,
  FaConnectdevelop,
  FaPlayCircle,
  FaVolumeUp,
} from "react-icons/fa";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-40"
          style={{
            backgroundImage: `url('/images/background/music-notes-flow.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos-950/80 via-cosmos-950/90 to-cosmos-950" />
      </div>

      {/* ---  CONTENT --- */}
      <section className="relative z-10 flex flex-col items-center min-h-[80vh] pt-12 pb-24 overflow-hidden">
        {/* 1. HERO TEXT */}
        <div className="mb-16 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-purple leading-tight"
          >
            Preserving Somali Music with AI.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto italic"
          >
            Exploring the intersection of generative AI, cultural heritage, and
            algorithmic sound.
          </motion.p>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: The "Marketi */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                From Cassette Tapes to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
                  Neural Networks
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                My flagship project,{" "}
                <strong className="text-white">QaraamiGen AI</strong>, uses deep
                learning to analyze decades of traditional Oud recordings. It
                doesn't just replicate sound; it understands the{" "}
                <em>Qaraami</em> (scales) to generate new compositions that
                honor the past.
              </p>

              {/* Small Project Cards */}
              <div className="space-y-4">
                <ProjectCard
                  title="QaraamiGen AI"
                  description="The core engine analyzing Somali pentatonic scales."
                  href="/projects/Qaraami-Gen-Ai"
                  icon={<FaMusic />}
                  accentColor="purple"
                />
              </div>
            </motion.div>

            {/* Right: The Generative Animation */}
            <div className="relative h-[500px] w-full">
              {/* Background Glow Effect behind the cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-purple/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. WHY COMPUTATIONAL MUSIC?*/}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-center mb-24 px-4"
        >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-blue">
            Why Computational Music?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-cosmos-800/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg hover:shadow-neon-cyan/20 transition duration-300">
              <FaLightbulb className="text-neon-cyan text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">
                Innovation
              </h3>
              <p className="text-gray-400 text-sm">
                Pushing boundaries, exploring new sonic territories that emerge
                from the convergence of music theory and computational power.
              </p>
            </div>
            <div className="p-6 bg-cosmos-800/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg hover:shadow-neon-purple/20 transition duration-300">
              <FaConnectdevelop className="text-neon-purple text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">
                Preservation
              </h3>
              <p className="text-gray-400 text-sm">
                Using technology to safeguard and revitalize musical traditions.
                AI provides a powerful tool for cultural continuity.
              </p>
            </div>
            <div className="p-6 bg-cosmos-800/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg hover:shadow-neon-blue/20 transition duration-300">
              <FaMusic className="text-neon-blue text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">
                Expression
              </h3>
              <p className="text-gray-400 text-sm">
                Computation is a new medium for artistic expression, enabling
                musicians to explore previously unimaginable sonic palettes.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.6 }}
          className="max-w-5xl mx-auto mb-16 p-8 bg-cosmos-800/70 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white">
            SOMALI MUSIC
          </h2>
          <div className="grid md:grid-cols-3 my-5"></div>

          <p className="text-lg text-gray-300 text-center mb-10">
            My passion for computational music is deeply intertwined with my
            cultural roots and appreciation for traditional Somali music,
            especially the rich sounds of the Oud. This project is a step
            towards exploring how technology can serve as a bridge to
            understand, create, and preserve diverse musical heritages.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Video of Oud Playing/Somali Music */}
            <motion.div
              variants={mediaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="relative w-full h-80 overflow-hidden rounded-xl shadow-2xl border-2 border-neon-purple/50 group"
            >
              <video
                ref={videoRef}
                src="/videos/Subcis.mp4"
                controls
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              >
                Your browser does not support the video tag.
              </video>

              {/* Clickable Play Icon Overlay */}
              {!isPlaying && (
                <div
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors z-10"
                >
                  <FaPlayCircle className="text-neon-purple text-8xl hover:scale-110 transition-transform drop-shadow-2xl" />
                </div>
              )}

              {/* Bottom gradient text */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                <p className="text-white text-lg font-semibold flex items-center">
                  <FaPlayCircle className="mr-2 text-neon-purple" />
                  Qaraami (Subcis)
                </p>
              </div>
            </motion.div>

            {/* Image of Oud/Somali Music Performance */}
            <motion.div
              variants={mediaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="relative w-full h-80 overflow-hidden rounded-xl shadow-2xl border-2 border-neon-blue/50 group"
            >
              <Image
                src="/images/Xudaydi.png"
                alt="Oud musical performance"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-lg font-semibold flex items-center">
                  <FaMusic className="mr-2 text-neon-blue" /> Ahmed Ismail
                  “Hudeidi”
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={mediaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="relative w-full h-80 overflow-hidden rounded-xl shadow-2xl border-2 border-neon-blue/50 group"
            >
              <Image
                src="/images/oud-performance-image.jpg"
                alt="Oud musical performance"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-lg font-semibold flex items-center">
                  <FaMusic className="mr-2 text-neon-blue" />
                  Abdillahi Qarshe
                </p>
              </div>
            </motion.div>
          </div>
          {/* Somali Music CASSETTE TAPES FROM harveara */}
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white pt-5.5">
            Eda Kuhn Loeb Music Library
          </h2>

          <div className="grid gap-6">
            {[
              {
                file: "/audio/harvard_audio_direct.mp3",
                label: "Tubec; Author:'Xudeydi:-Harvard archives",
              },
              {
                file: "/audio/harvard_audio.mp3",
                label: "Sahro Axmed(Laxan/Melody:Burcaawi)",
              },
              {
                file: "/audio/extracted_audio.mp3",
                label: "Hadaynan-Heshiineyn ~Cumar Dhuule",
              },
            ].map((track, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center justify-between p-4 bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5"
              >
                <span className="flex items-center text-gray-700 dark:text-gray-300 font-bold mb-2 md:mb-0">
                  <FaVolumeUp className="text-blue-500 mr-3" /> {track.label}
                </span>
                <audio controls className="w-full md:w-1/2 h-10">
                  <source src={track.file} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center text-gray-400 pb-32">
          <p className="text-lg mb-4 font-mono">
            "The future of music lies at the intersection of human creativity
            and machine intelligence."
          </p>
          <p className="text-sm italic">
            — A guiding principle in my pursuit of the Master of Science in
            Music Technology and Computation.
          </p>
        </div>
      </section>
    </div>
  );
}
