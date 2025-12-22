"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaPenNib,
  FaUser,
  FaCalendar,
  FaClock,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const TAGS = [
  "All", "Research", "History", "Music Theory", "Artificial Intelligence",
  "Somali Culture", "Machine Learning", "Restoration",
];

interface PostData {
  _id: string;
  title: string;
  author: string;
  content: string;
  date: string;
  tag: string;
  image: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", content: "", tag: "Research" });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) setPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!formData.title || !formData.content) return;
    const newPost = { ...formData, image: "/images/chat/map.jpg" };
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const result = await res.json();
      if (result.success) {
        setPosts([result.data, ...posts]);
        setIsWriting(false);
        setFormData({ title: "", author: "", content: "", tag: "Research" });
      }
    } catch (error) { console.error("Failed to save"); }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "All" || post.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

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
      <section className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* HEADER SECTION */}
          <header className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-neon-purple tracking-tighter"
            >
              Archives
            </motion.h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light mb-12">
              Deep dives into Somali Ethnomusicology, AI research, and the future of cultural restoration.
            </p>

            {/* SEARCH & WRITE ACTION */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto mb-12">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search the archives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pl-14 pr-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all"
                />
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <button
                onClick={() => setIsWriting(true)}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-cyan to-blue-600 text-white font-black shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center justify-center whitespace-nowrap"
              >
                <FaPenNib className="mr-2" /> Write Story
              </button>
            </div>

            {/* TAGS FILTER */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeTag === tag
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-neon-cyan"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </header>

          {/* LOADING & EMPTY STATES */}
          {loading && <div className="text-center py-20 animate-pulse text-neon-cyan font-mono">Scanning neural archives...</div>}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <h3 className="text-xl text-gray-500">No signals found matching your search.</h3>
              <button onClick={() => { setSearchQuery(""); setActiveTag("All"); }} className="mt-4 text-neon-cyan underline">Reset Sensors</button>
            </div>
          )}

          {/* FEATURED POST */}
          {!loading && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-20 group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-80 lg:h-[500px] overflow-hidden">
                  <Image
                    src={featuredPost.image.startsWith("/") || featuredPost.image.startsWith("http") ? featuredPost.image : "/images/chat/prof.jpg"}
                    alt={featuredPost.title} fill className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmos-950/80 to-transparent hidden lg:block" />
                </div>
                <div className="p-8 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-black uppercase tracking-widest border border-neon-cyan/20">
                      {featuredPost.tag}
                    </span>
                    <span className="text-gray-500 text-sm font-mono tracking-tighter italic">
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/blog/${featuredPost._id}`}>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-neon-cyan transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-gray-400 text-lg mb-8 line-clamp-3 font-light leading-relaxed italic">
                    &quot;{featuredPost.content}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <FaUser className="text-gray-400" />
                      </div>
                      <span className="text-white font-medium">{featuredPost.author}</span>
                    </div>
                    <Link href={`/blog/${featuredPost._id}`} className="flex items-center gap-2 text-neon-cyan font-bold hover:gap-4 transition-all">
                      Read Entry <FaChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GRID POSTS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all group shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4 flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    <FaCalendar className="mr-2" /> {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Link href={`/blog/${post._id}`} className="block flex-grow">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed font-light italic">
                      {post.content}
                    </p>
                  </Link>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                      <FaUser className="text-[10px]" /> {post.author}
                    </span>
                    <span className="text-[10px] text-gray-600 flex items-center gap-1 font-mono uppercase tracking-widest">
                      <FaClock /> 5m read
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WRITE MODAL - UPDATED STYLING */}
      <AnimatePresence>
        {isWriting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cosmos-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl border border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black text-white tracking-tighter">New Archival Entry</h3>
                <button onClick={() => setIsWriting(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                  <FaTimes className="text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  className="w-full p-5 bg-black/40 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all"
                  placeholder="Title of your research..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="p-5 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-neon-cyan transition-all appearance-none cursor-pointer"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  >
                    {TAGS.slice(1).map((t) => <option key={t} value={t} className="bg-cosmos-900">{t}</option>)}
                  </select>
                  <input
                    className="p-5 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-neon-cyan transition-all"
                    placeholder="Researcher Name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <textarea
                  className="w-full p-5 h-56 bg-black/40 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-neon-cyan outline-none resize-none transition-all placeholder:italic"
                  placeholder="Document your findings here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
                <button
                  onClick={handlePost}
                  className="w-full py-5 bg-gradient-to-r from-neon-cyan via-blue-600 to-neon-purple text-white rounded-2xl font-black shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all uppercase tracking-widest"
                >
                  Publish to Archives
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}