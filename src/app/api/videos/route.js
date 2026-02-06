import { NextResponse } from "next/server";
import  dbConnect  from "../../../lib/mongodb.js";
import Video from "../../../models/Vidoes";

export async function GET() {
  await dbConnect();

  const videos = await Video.find().sort({ createdAt: -1 });
  return NextResponse.json(videos);
}
