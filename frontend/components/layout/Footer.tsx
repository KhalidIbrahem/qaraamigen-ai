import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaMicrochip } from "react-icons/fa"; 

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Technical", href: "/projects/code-test" },
    { name: "Somali Gen AI", href: "/projects/somali-gen-ai" },
    { name: "Chat", href: "/chat" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-white/80 dark:bg-cosmos-900/80 backdrop-blur-md border-t border-gray-200 dark:border-white/10 pt-16 pb-8 relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* TOP SECTION: 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          
          {/* 1. BRANDING (Left) */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold font-mono group">
              <FaMicrochip className="text-blue-600 dark:text-neon-cyan group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-gray-900 dark:text-white">
                QaraamiGen <span className="text-blue-600 dark:text-neon-cyan">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
              Bridging the gap between Artificial Intelligence and Somali Cultural Heritage through computational research.
            </p>
          </div>

          {/* 2. NAVIGATION (Middle - FIXED) */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Explore
            </h3>
            
            {/* THE FIX: 
                - flex-col + space-y-3 for MOBILE (Vertical)
                - md:flex-row + md:space-x-6 for DESKTOP (Horizontal side-by-side)
                - md:flex-wrap allows them to wrap if the screen gets too tight
            */}
            <ul className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:space-x-6 md:flex-wrap md:justify-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-cyan transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SOCIALS (Right) */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Connect
            </h3>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/KhalidIbrahem" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-neon-purple text-2xl transition-transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/khalidibrahimabdi1/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue text-2xl transition-transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a 
                href="mailto:ibrahimkhalid032@gmail.com" 
                className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-neon-cyan text-2xl transition-transform hover:scale-110"
                aria-label="Email Me"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-500">
          <p className="mb-2 md:mb-0 text-shadow-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Khalid Ibrahim. All rights reserved.
          </p>
          <p className="font-mono text-shadow-xs opacity-100">
            Researcher | Developer | Music Innovator
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;