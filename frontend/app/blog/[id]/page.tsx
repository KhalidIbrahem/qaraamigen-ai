import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaCalendar, FaClock, FaQuoteLeft } from "react-icons/fa";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();

  let post;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return notFound();
    post = await Post.findById(id);
  } catch (error) {
    return notFound();
  }

  if (!post) return notFound();

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
      <article className="relative z-10 min-h-screen pb-20 pt-32 px-4">
        
        {/* NAVIGATION AREA */}
        <div className="container mx-auto max-w-4xl mb-10">
          <Link href="/blog" className="group inline-flex items-center text-neon-cyan hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em]">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform" /> 
            Back to Neural Archives
          </Link>
        </div>

        {/* HERO IMAGE & TITLE CARD */}
        <div className="container mx-auto max-w-5xl mb-12">
          <div className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Darker, more atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cosmos-950 via-cosmos-950/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-5 py-1.5 bg-neon-cyan/20 backdrop-blur-xl text-neon-cyan text-[10px] font-black rounded-full uppercase tracking-widest border border-neon-cyan/30">
                  {post.tag}
                </span>
                <span className="flex items-center text-gray-400 text-xs font-mono">
                  <FaClock className="mr-2" /> 5 MIN READ
                </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tighter drop-shadow-2xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <FaUser className="text-neon-blue text-sm" />
                  </div>
                  <span className="font-bold text-sm tracking-wide">{post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <FaCalendar className="text-neon-purple text-sm" />
                  </div>
                  <span className="font-mono text-xs uppercase text-gray-400">
                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* READER CONTENT */}
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
            
            {/* Aesthetic Quote Icon Background */}
            <FaQuoteLeft className="absolute -top-10 -left-10 text-white/5 text-[15rem] pointer-events-none" />

            {/* Content Body */}
            <div className="relative z-10">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-300 leading-[2.2] text-lg md:text-xl font-light whitespace-pre-line selection:bg-neon-cyan selection:text-black">
                  {post.content}
                </div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-white/5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Hash ID:</span>
                <span className="text-[10px] font-mono text-neon-cyan">{post._id.toString()}</span>
              </div>
              <Link href="/blog" className="group flex items-center gap-2 text-white font-bold hover:text-neon-cyan transition-all">
                Discover More Stories <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}