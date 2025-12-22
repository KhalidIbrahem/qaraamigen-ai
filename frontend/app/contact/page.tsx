"use client";

import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaHeadset,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch("https://formspree.io/f/mnnwydvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        reset();
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 1. SHARED BACKGROUND LAYER */}
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

      {/* 2. CONTENT LAYER */}
      <section className="relative z-10 container mx-auto px-4 pt-24 pb-20">
        <ToastContainer theme="dark" position="bottom-right" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-neon-cyan text-2xl shadow-xl shadow-cyan-500/10"
          >
            <FaHeadset />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-blue-400"
          >
            Get In Touch
          </motion.h1>
          <p className="text-gray-400 text-lg md:text-xl font-light italic">
            Ready to discuss the future of AI and Somali Music Technology?
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* LEFT: SOCIAL CARDS */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {[
              {
                icon: <FaEnvelope className="text-neon-cyan" />,
                label: "Email",
                val: "ibrahimkhalid032@gmail.com",
                href: "mailto:ibrahimkhalid032@gmail.com",
              },
              {
                icon: <FaLinkedin className="text-neon-blue" />,
                label: "LinkedIn",
                val: "khalidibrahimabdi1",
                href: "https://www.linkedin.com/in/khalidibrahimabdi1/",
              },
              {
                icon: <FaGithub className="text-neon-purple" />,
                label: "GitHub",
                val: "KhalidIbrahem",
                href: "https://github.com/KhalidIbrahem",
              },
            ].map((method, i) => (
              <a
                key={i}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group shadow-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="text-3xl p-4 bg-black/20 rounded-2xl group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                      {method.label}
                    </h4>
                    <p className="text-white font-medium break-all">
                      {method.val}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            <div className="p-8 bg-gradient-to-br from-neon-cyan/10 to-transparent rounded-3xl border border-cyan-500/20">
              <p className="text-gray-400 text-sm italic leading-relaxed">
                &quot;I am always looking for collaborations with musicians,
                developers, and researchers passionate about cultural
                preservation through AI.&quot;
              </p>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-2 tracking-widest">
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-neon-cyan focus:outline-none transition-all placeholder:text-gray-700"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs ml-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-2 tracking-widest">
                    Your Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: /^\S+@\S+$/i,
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-neon-purple focus:outline-none transition-all placeholder:text-gray-700"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs ml-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-2 tracking-widest">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  {...register("message", {
                    required: "Message cannot be empty",
                  })}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-neon-blue focus:outline-none transition-all placeholder:text-gray-700 resize-none"
                  placeholder="How can we collaborate?"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs ml-2">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-neon-cyan via-blue-600 to-neon-purple text-white font-black rounded-2xl shadow-xl shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
