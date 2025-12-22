import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // --- SYSTEM PROMPT ---
    const systemPrompt = `
     
      
      User Question: ${message}
    `;

    // --- ROBUST MODEL SELECTION ---
    // We try the newest model first. If it fails, we fallback.
    let model;
    try {
       // Try the fast model first
       model = genAI.getGenerativeModel(
        { model: "gemini-2.5-flash" }
        
       );
    } catch (err) {
       // Fallback to standard pro
       console.log("Switching to fallback model...");
       model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
    
  } catch (error: any) {
    console.error("Gemini API Critical Error:", error);
    
    // Return the actual error to the chat window so we can see it
    return NextResponse.json(
      { error: `API Error: ${error.message || "Unknown Error"}` }, 
      { status: 500 }
    );
  }
}