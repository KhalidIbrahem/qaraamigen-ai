import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/juancopi81/music-transcription", 
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": file.type || "audio/wav",
        },
        method: "POST",
        body: buffer,
      }
    );

    // --- SAFETY CHECK FOR HTML RESPONSES ---
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error("Hugging Face returned non-JSON:", errorText);
      return NextResponse.json(
        { error: "Model is currently loading or unavailable. Please wait 20 seconds and try again." },
        { status: 503 }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Internal API Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}