// src/app/api/admin/work/delete/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb.js";
import Work from "../../../../../../models/Work.js";
import { deleteFromCloudinary } from "../../../../../../lib/deleteFromCloudinary.js";

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const work = await Work.findById(id);

    if (!work) {
      console.error("❌ Work not found:", id);
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    // delete images from cloudinary
    for (const img of work.images) {
      try {
        console.log("☁️ Deleting image:", img.public_id);
        await deleteFromCloudinary(img.public_id);
      } catch (err) {
        console.error(
          "⚠️ Cloudinary delete failed:",
          img.public_id,
          err.message
        );
      }
    }

    await Work.findByIdAndDelete(id);

    console.log("✅ Work deleted:", id);

    return NextResponse.json({
      success: true,
      message: "Work deleted successfully",
    });
  } catch (err) {
    console.error("🔥 Delete work error");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
