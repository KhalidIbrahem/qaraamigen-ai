"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { 
  FaPlus, 
  FaBars, 
  FaArrowUp, 
  FaUser, 
  FaRobot,
  FaTrash,
  FaCommentAlt,
  FaBrain
} from "react-icons/fa";

const IMAGE_MAP: Record<string, string> = {
  "OUD": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Oud_player.jpg/1200px-Oud_player.jpg",
  "DHAANTO": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Somali_folk_dance.jpg", 
  "MAP": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Map_of_Somaliland.svg/1200px-Map_of_Somaliland.svg.png",
  "TAPE": "https://images.unsplash.com/photo-1622627860836-c3968c091707?q=80&w=1000&auto=format&fit=crop",
};

interface Message {
  role: "user" | "bot";
  content: string;
  image?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("qaraami_chat_history");
    if (saved) {
      const parsedSessions = JSON.parse(saved);
      setSessions(parsedSessions);
      if (parsedSessions.length > 0) setActiveSessionId(parsedSessions[0].id);
      else createNewChat();
    } else createNewChat();
  }, []);

  useEffect(() => {
    if (isMounted && sessions.length > 0) {
      localStorage.setItem("qaraami_chat_history", JSON.stringify(sessions));
    }
  }, [sessions, isMounted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId, isLoading]);

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Research Session",
      messages: [{ 
        role: "bot", 
        content: "Hello. I am **The Archivist**. \n\nI am connected to the QaraamiGen AI neural archives. Ask me about Somali music theory, acoustics, or our digital preservation efforts.",
      }],
      createdAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (newSessions.length === 0) createNewChat();
    else if (activeSessionId === id) setActiveSessionId(newSessions[0].id);
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeSessionId) return;
    const userMessage = input;
    setInput("");
    setIsLoading(true);

    setSessions(prev => prev.map(session => {
      if (session.id === activeSessionId) {
        const newTitle = session.messages.length === 1 
          ? (userMessage.length > 30 ? userMessage.substring(0, 30) + "..." : userMessage)
          : session.title;
        return { ...session, title: newTitle, messages: [...session.messages, { role: "user", content: userMessage }] };
      }
      return session;
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      let rawText = data.text;
      let imageToDisplay = undefined;
      const regex = /\[\[IMAGE:(\w+)\]\]/;
      const match = rawText.match(regex);
      if (match) {
        imageToDisplay = IMAGE_MAP[match[1]];
        rawText = rawText.replace(match[0], "");
      }
      setSessions(prev => prev.map(session => {
        if (session.id === activeSessionId) {
          return { ...session, messages: [...session.messages, { role: "bot", content: rawText, image: imageToDisplay }] };
        }
        return session;
      }));
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  const activeMessages = sessions.find(s => s.id === activeSessionId)?.messages || [];
  if (!isMounted) return <div className="h-screen bg-cosmos-950"></div>;

  return (
    <div className="relative flex h-screen overflow-hidden pt-[70px]">
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
      {/* 2. SIDEBAR - Glassmorphism */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="relative z-20 hidden md:flex flex-col bg-white/5 backdrop-blur-2xl border-r border-white/10 h-full flex-shrink-0"
          >
            <div className="p-6">
              <button 
                onClick={createNewChat}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-neon-cyan to-blue-600 rounded-2xl transition-all font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
              >
                <FaPlus className="text-xs" /> New Research
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
              <h3 className="px-4 text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em]">Neural History</h3>
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div 
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`group relative flex items-center gap-3 w-full px-4 py-4 rounded-2xl transition-all cursor-pointer border ${
                      activeSessionId === session.id 
                        ? "bg-white/10 border-white/20 text-white shadow-xl" 
                        : "text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300"
                    }`}
                  >
                    <FaCommentAlt className={`text-xs shrink-0 ${activeSessionId === session.id ? "text-neon-cyan" : "opacity-30"}`} />
                    <span className="truncate flex-1 text-sm font-medium tracking-tight">{session.title}</span>
                    <button 
                      onClick={(e) => deleteSession(e, session.id)}
                      className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
                    <div className="w-full h-full rounded-full bg-cosmos-900 flex items-center justify-center text-xs font-bold">KI</div>
                  </div>
                  <div className="text-sm font-bold text-gray-200 tracking-tight">Khalid Ibrahim</div>
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 3. MAIN CHAT AREA */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0">
        <div className="absolute top-6 left-6 z-30">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-gray-400 hover:text-white transition shadow-xl"
          >
            <FaBars />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto pt-24 pb-48 px-6">
            {activeMessages.map((msg, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                key={index} 
                className="mb-12"
              >
                <div className="flex gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl border ${
                    msg.role === "user" 
                      ? "bg-white/5 border-white/10" 
                      : "bg-gradient-to-br from-neon-cyan to-blue-600 border-white/20"
                  }`}>
                    {msg.role === "user" ? <FaUser className="text-gray-400" /> : <FaBrain className="text-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-gray-500">
                      {msg.role === "user" ? "Researcher" : "The Archivist Neural Link"}
                    </div>
                    
                    <div className={`p-6 rounded-[2rem] border ${
                      msg.role === "user" 
                      ? "bg-white/5 border-white/10" 
                      : "bg-black/20 border-white/5 backdrop-blur-sm"
                    }`}>
                      <ReactMarkdown
                        components={{
                          h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                          p: ({node, ...props}) => <p className="mb-4 text-gray-300 leading-relaxed font-light" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-black text-neon-cyan" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-400" {...props} />,
                          li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                    {msg.image && (
                      <div className="mt-6 relative w-full h-80 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
                         <Image src={msg.image} alt="Context" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-cosmos-950/80 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-6 mb-12">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                 </div>
                 <div className="pt-4 text-[10px] font-mono uppercase tracking-widest text-neon-cyan animate-pulse">Syncing neural layers...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cosmos-950 via-cosmos-950/90 to-transparent pb-10 pt-20 px-6">
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex items-end p-3 focus-within:border-neon-cyan/50 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Message The Archivist..."
                className="w-full bg-transparent text-white placeholder-gray-600 px-6 py-4 max-h-48 min-h-[60px] outline-none resize-none text-base font-light"
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className={`p-4 mb-1 mr-1 rounded-2xl transition-all duration-300 ${
                  input.trim() 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105" 
                    : "bg-white/5 text-gray-700 cursor-not-allowed"
                }`}
              >
                <FaArrowUp className="text-sm" />
              </button>
            </div>
            <p className="text-center text-[10px] font-mono uppercase tracking-[0.4em] text-gray-600 mt-6">
              Neural Network Research Preview
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}