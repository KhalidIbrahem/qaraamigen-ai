import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    console.log("🎬 Starting Video Generation for:", prompt);

    const enhancedPrompt = `${prompt}, cinematic lighting, somali culture aesthetic, 4k, highly detailed, slow motion`;

    // 1. Start the prediction (Don't wait for result yet)
    let prediction = await replicate.predictions.create({
      version: "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", // Zeroscope XL
      input: {
        prompt: enhancedPrompt,
        num_frames: 24,
        width: 576,
        height: 320,
        fps: 24
      }
    });

    // 2. Polling Loop: Check status every 1 second until done
    // This bypasses the "Stream" issue by getting the final URL string
    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 sec
      prediction = await replicate.predictions.get(prediction.id);
      console.log("   ... Status:", prediction.status);
    }

    if (prediction.status === "failed") {
      throw new Error("Prediction failed on Replicate side.");
    }

    // 3. Extract the URL (It is now guaranteed to be a string or array of strings)
    const output = prediction.output;
    console.log("📦 Final Output:", output);

    let finalUrl = "";
    if (Array.isArray(output)) {
        finalUrl = output[0];
    } else {
        finalUrl = String(output);
    }

    console.log("🔗 Video URL:", finalUrl);

    return NextResponse.json({ videoUrl: finalUrl });

  } catch (error: any) {
    console.error("❌ Video Gen Error:", error);
    return NextResponse.json(
      { error: "Failed to generate video." }, 
      { status: 500 }
    );
  }
}