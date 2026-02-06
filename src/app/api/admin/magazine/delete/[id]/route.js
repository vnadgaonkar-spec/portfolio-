// src/app/api/admin/magazine/delete/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb.js";
import Magazine from "../../../../../../models/Magazine.js";
import { deleteFromCloudinary } from "../../../../../../lib/deleteFromCloudinary.js";

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const magazine = await Magazine.findById(id);

    if (!magazine) {
      console.error("❌ Magazine not found:", id);
      return NextResponse.json(
        { success: false, error: "Magazine not found" },
        { status: 404 }
      );
    }

    // delete image from cloudinary
    if (magazine.image?.public_id) {
      try {
        console.log("☁️ Deleting image:", magazine.image.public_id);
        await deleteFromCloudinary(magazine.image.public_id);
      } catch (err) {
        console.error(
          "⚠️ Cloudinary delete failed:",
          magazine.image.public_id,
          err.message
        );
      }
    }

    await Magazine.findByIdAndDelete(id);

    console.log("✅ Magazine deleted:", id);

    return NextResponse.json({
      success: true,
      message: "Magazine deleted successfully",
    });
  } catch (err) {
    console.error("🔥 Delete magazine error");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}