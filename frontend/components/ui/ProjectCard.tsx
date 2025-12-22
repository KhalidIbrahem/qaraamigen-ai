"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  accentColor: "cyan" | "purple"; // Different colors for different card types
}

const ProjectCard = ({ title, description, href, icon, accentColor }: ProjectCardProps) => {
  const borderColor = accentColor === "cyan" ? "hover:border-neon-cyan/50" : "hover:border-neon-purple/50";
  const glowColor = accentColor === "cyan" ? "group-hover:shadow-neon-cyan/20" : "group-hover:shadow-neon-purple/20";

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`group relative p-6 bg-cosmos-800/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${borderColor} shadow-lg ${glowColor}`}
      >
        {/* subtle glowing gradient background behind the card */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br from-${accentColor}-500/30 to-transparent -z-10`}></div>
        
        <div className="mb-4 text-3xl text-gray-300 group-hover:text-white transition">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 font-mono text-sm">{description}</p>

        <div className={`mt-6 inline-flex items-center text-sm font-bold text-${accentColor}-400 group-hover:text-${accentColor}-300`}>
          Explore Project →
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;