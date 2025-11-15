import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await dbConnect();
  try {
     
    const posts = await Post.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}