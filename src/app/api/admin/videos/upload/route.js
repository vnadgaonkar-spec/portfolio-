import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb.js";
import Video from "../../../../../models/Vidoes.js";
import { VideoSchema } from "../../../../../lib/validators/videoSchema.js";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = VideoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const video = await Video.create(parsed.data);
    return NextResponse.json(
      { success: true, data: video },
      { status: 201 }
    );
  } catch (err) {
    console.error("🔥 Upload video error");
    console.error(err.message);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
