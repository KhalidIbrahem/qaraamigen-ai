import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Post from "../models/Post";

dotenv.config({ path: ".env" });

const POSTS = [
  {
    title: "A Definition for Qaraami",
    author: "Jama Musse Jama",
    tag: "Music Theory",
    // CORRECT: This file exists in your screenshot
    image: "/images/chat/oud.jpg", 
    content: `Qaraami can be classified for the Somali culture as Classical Music is to the Western world...`
  },
  {
    title: "The Silent Fading: A Manifesto",
    author: "Khalid Ibrahim",
    tag: "Research",
    // CORRECT: This file exists in your screenshot
    image: "/images/chat/prof.jpg",
    content: `In the 1970s and 80s, Mogadishu and Hargeisa were hubs of a musical renaissance...`
  },
  {
    title: "The Legend of Xudaydi",
    author: "Khalid Ibrahim",
    tag: "History",
    // CORRECT: This file exists in your screenshot
    image: "/images/chat/Xudaydi.png",
    content: `Ahmed Ismail Hussein, known as Xudaydi, was the King of the Oud...`
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  
  console.log("🧹 Deleting OLD bad data...");
  await Post.deleteMany({});
  
  console.log("🌱 Inserting NEW correct data...");
  await Post.insertMany(POSTS);
  
  console.log("✅ SUCCESS! Database fixed.");
  process.exit();
}

seed();