import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: String, default: "COMMUNITY" },
  image: { type: String, default: "@/public/images/chat/prof.jpg" },
  date: { type: Date, default: Date.now },
});


export default mongoose.models.Post || mongoose.model("Post", PostSchema);
