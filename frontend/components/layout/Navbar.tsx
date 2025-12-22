"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import { FaMicrochip, FaGoogle, FaSignOutAlt } from "react-icons/fa";

import { useSession, signIn, signOut } from "next-auth/react";

// --- CONFIGURATION ---
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Chat", href: "/chat" },
  { name: "Technical", href: "/projects/code-test" },
  { name: "Somali Gen AI", href: "/projects/somali-gen-ai" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// --- ANIMATION VARIANTS (Fixed Types) ---
const menuVars = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0] as const, // Added 'as const'
      staggerChildren: 0.09,
    },
  },
  exit: {
    scaleY: 0,
    transition: { 
      delay: 0.2, 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const // Added 'as const'
    },
  },
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: { 
      duration: 0.5, 
      ease: [0.37, 0, 0.63, 1] as const // Added 'as const'
    },
  },
  animate: { 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0, 0.55, 0.45, 1] as const // Added 'as const'
    } 
  },
};

// --- COMPONENT HELPERS ---

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        href={href}
        className={`relative block px-3 py-2 text-sm font-medium transition-colors duration-300
        ${
          isActive
            ? "text-blue-600 dark:text-neon-cyan"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }
      `}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-neon-cyan"
          />
        )}
      </Link>
    </motion.li>
  );
};

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div variants={mobileLinkVars} className="overflow-hidden">
      <Link
        href={href}
        onClick={onClick}
        className={`block text-2xl font-bold py-3 text-center transition-colors
        ${
          isActive
            ? "text-blue-600 dark:text-neon-cyan"
            : "text-gray-800 dark:text-gray-300"
        }
        `}
      >
        {children}
      </Link>
    </motion.div>
  );
};

// --- MAIN NAVBAR ---
const Navbar = () => {
  const { scrollY } = useScroll();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll Logic: Change background on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !scrolled) setScrolled(true);
    else if (latest <= 50 && scrolled) setScrolled(false);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${
            scrolled || isOpen
              ? "bg-white/90 dark:bg-cosmos-950/90 backdrop-blur-md shadow-xl border-b border-gray-200 dark:border-white/5"
              : "bg-transparent"
          }
          py-4 px-6 md:px-12
        `}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold font-mono group z-50 relative"
          >
            <FaMicrochip className="text-blue-600 dark:text-neon-cyan group-hover:scale-110 transition-transform" />

            <span className="hidden md:block text-gray-900 dark:text-white">
              QaraamiGen{" "}
              <span className="text-blue-600 dark:text-neon-cyan">AI</span>
            </span>

            {/* Mobile simplified logo (QGAI) */}
            <span className="md:hidden text-gray-900 dark:text-white">
              QG<span className="text-blue-600 dark:text-neon-cyan">AI</span>
            </span>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </ul>

            <div className="h-6 w-[1px] bg-gray-300 dark:bg-white/20"></div>

            {/* DESKTOP AUTH */}
            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-white/20 bg-blue-600 flex items-center justify-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      // Fallback: Just show the first letter of the name
                      <span className="text-white text-xs font-bold">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 transition shadow-lg flex items-center gap-2"
                >
                  <FaGoogle /> Sign In
                </button>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER BUTTON (Visible only on Mobile) */}
          <div className="md:hidden flex items-center space-x-4 z-50 relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                  className="w-full h-0.5 bg-current block origin-center transition-all"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="w-3/4 h-0.5 bg-current block transition-all"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -8 : 0,
                    width: isOpen ? "100%" : "50%",
                  }}
                  className="w-1/2 h-0.5 bg-current block origin-center transition-all"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-white dark:bg-cosmos-950 origin-top flex flex-col justify-center items-center overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 mb-8">
              {NAV_LINKS.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </MobileNavLink>
              ))}
            </div>

            {/* MOBILE AUTH SECTION */}
            <div className="flex flex-col items-center gap-6 border-t border-gray-200 dark:border-white/10 pt-8 w-64">
              {session ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <Image
                      src={session.user?.image || "/images/chat/oud.jpg"}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {session.user?.name}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-red-500 text-sm font-bold mt-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn("google");
                    setIsOpen(false);
                  }}
                  className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 transition shadow-lg flex items-center gap-2"
                >
                  <FaGoogle /> Sign In
                </button>
              )}
            </div>

            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-blue-500/5 dark:to-neon-cyan/5 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;