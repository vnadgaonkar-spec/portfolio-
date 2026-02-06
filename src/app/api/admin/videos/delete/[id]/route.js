// src/app/api/admin/videos/delete/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb.js";
import Video from "../../../../../../models/Vidoes.js";

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;
    console.log("🗑️ Deleting video:", id);

    const video = await Video.findById(id);

    if (!video) {
      console.error("❌ Video not found:", id);
      return NextResponse.json(
        { success: false, error: "Video not found" },
        { status: 404 }
      );
    }

    await Video.findByIdAndDelete(id);

    console.log("✅ Video deleted:", id);

    return NextResponse.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    console.error("🔥 Delete video error");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
