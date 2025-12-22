"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Wait for mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-cosmos-900 border border-cosmos-800 text-neon-cyan hover:text-white hover:border-neon-cyan transition-all shadow-lg"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FaMoon className="w-5 h-5" />
      ) : (
        <FaSun className="w-5 h-5 text-[#adc5cf]" />
      )}
    </motion.button>
  );
}