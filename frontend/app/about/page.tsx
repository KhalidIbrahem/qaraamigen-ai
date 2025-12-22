"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  FaLaptopCode, 
  FaPython, 
  FaMusic, 
  FaCube, 
  FaBrain, 
  FaArchive, 
  FaMicrochip 
} from "react-icons/fa";

export default function AboutPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const innovationCards = [
    {
      title: "AI Models & Datasets",
      desc: "Generative AI for Somali Music & Language",
      link: "/projects/ai-models",
      image: "/images/ai-mesh.jpg",
      icon: <FaBrain />,
      color: "purple"
    },
    {
      title: "Digital Archiving",
      desc: "Preserving Somali Qaraami Traditions",
      link: "/projects/archiving",
      image: "/images/oud-archive.jpg",
      icon: <FaArchive />,
      color: "cyan"
    },
    {
      title: "Technical Case Studies",
      desc: "Deep Dives into Engineering Architecture",
      link: "/projects/case-studies",
      image: "/images/code-logic.jpg",
      icon: <FaMicrochip />,
      color: "blue"
    }
  ];

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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-neon-cyan text-center tracking-tighter"
        >
          About Me & My Vision
        </motion.h1>

        {/* Introduction Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-4xl mx-auto text-lg text-gray-300 space-y-8 mb-24 p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl"
        >
          <p className="leading-relaxed">
            Hello! I&apos;m <strong className="text-neon-cyan">Khalid Ibrahim</strong>, a <span className="text-blue-400 font-bold">software developer, AI researcher</span>, and passionate <strong>oud</strong> player dedicated to preserving Somali cultural music through modern technology.
          </p>
          <p className="leading-relaxed">
            I studied Computer Science and Electrical & Electronic Engineering in Turkey, where I deepened my understanding of programming, mathematics, and acoustics. Alongside my academic journey, I trained in traditional oud performance and studied both Western 7-note scales and Somali 5-note scales.
          </p>
          <p className="leading-relaxed italic">
            Music has always been more than a passion; it is a responsibility. I grew up surrounded by the soulful rhythms of Somali Qaraami songs, and realized that unlike other global musical traditions, Somali music has very limited written documentation or academic digital archiving. This realization shaped a long-term mission that defines who I am today.
          </p>
        </motion.div>

        {/* Innovation & Research Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-32"
        >
          <h2 className="text-4xl font-black text-center mb-16 text-white tracking-tight">Innovation & Research</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {innovationCards.map((card, index) => (
              <motion.a
                key={index}
                href={card.link}
                whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="group relative h-96 w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 opacity-30 group-hover:opacity-10 transition duration-700">
                  <Image src={card.image} alt={card.title} fill className="object-cover blur-[2px]" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos-950 via-cosmos-950/40 to-transparent" />

                <div className="relative z-10 text-center p-8">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-4xl text-${card.color}-400 group-hover:scale-110 group-hover:text-white transition duration-500`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 font-light italic leading-relaxed">{card.desc}</p>
                  
                  <span className="inline-block px-8 py-2 rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all">
                    Explore Research
                  </span>
                </div>
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-${card.color}-500/30 rounded-[2rem] transition duration-500`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Skills & Expertise Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-5xl mx-auto mb-32 p-10 bg-black/20 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            My Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: <FaLaptopCode />, title: "Fullstack", desc: "(Next.js, AI Apps)", color: "text-blue-400" },
              { icon: <FaPython />, title: "Python & AI", desc: "(Model Training)", color: "text-purple-400" },
              { icon: <FaMusic />, title: "Music Tech", desc: "(Generative Audio)", color: "text-cyan-400" },
              { icon: <FaCube />, title: "Algorithms", desc: "(Data Science)", color: "text-gray-400" }
            ].map((skill, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
                <div className={`${skill.color} text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>{skill.icon}</div>
                <p className="text-white text-md font-bold mb-1">{skill.title}</p>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest">{skill.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Oud Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-6xl mx-auto mb-32 p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl"
        >
          <h2 className="text-4xl font-black text-center mb-10 text-white tracking-tighter">
            The Soul of Somali Music: The Oud
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto font-light leading-relaxed italic">
            &quot;The Oud is the backbone of traditional Somali melodies, keeping me intimately connected to my heritage.&quot;
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              className="relative w-full h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 group"
            >
              <Image src="/images/khalid-with-oud.jpg" alt="Khalid playing Oud" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <p className="text-white text-lg font-bold italic">With my beloved Oud</p>
              </div>
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              className="relative w-full h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 group"
            >
              <Image src="/images/khalid-with-teacher.jpg" alt="Learning Oud" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <p className="text-white text-lg font-bold italic">Learning from the master</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Future Vision Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl text-center"
        >
          <h2 className="text-4xl font-black mb-8 text-white tracking-tight">
            Future in Music Technology
          </h2>
          <p className="text-lg text-gray-300 leading-[2.2] font-light">
            I am particularly eager to deepen my research into <strong className="text-neon-cyan">generative AI for non-Western music</strong>. 
            My vision is to become a leader in developing innovative tools that empower musicians and preserve diverse musical traditions through the lens of machine learning and human-computer interaction.
          </p>
        </motion.div>
      </section>
    </div>
  );
}