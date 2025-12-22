import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

import MusicWaves from "@/components/animations/MusicWaves";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Khalid Ibrahim | Computational Music Portfolio",
  description: "AI, Music Information Retrieval, and Somali Culture.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        
        suppressHydrationWarning={true} 
        className={`${inter.variable} ${jetbrains.variable} bg-cosmos-950 text-gray-200 relative min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        
        <SessionProvider>
          <div className="fixed inset-0 -z-10">
           
            <MusicWaves />
          </div>

          <div className="absolute inset-0 bg-gradient-radial from-transparent via-cosmos-950/50 to-cosmos-950 -z-5 pointer-events-none"></div>

          <Navbar />

          <main className="flex-grow pt-24 container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>

          <Footer />
          <Toaster /> 
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}