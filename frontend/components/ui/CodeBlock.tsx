"use client";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaPython } from "react-icons/fa";

interface CodeBlockProps {
  code: string;
  filename: string;
}

export default function CodeBlock({ code, filename }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e] my-6">
      {/* Header (Like a VS Code Tab) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <FaPython className="text-yellow-400" />
          <span>{filename}</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      
      {/* The Code */}
      <div className="text-sm md:text-base">
        <SyntaxHighlighter 
          language="python" 
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}