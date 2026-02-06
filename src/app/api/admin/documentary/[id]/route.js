import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Documentary from "../../../../../models/Documentary.js";
import { deleteFromCloudinary } from "../../../../../lib/deleteFromCloudinary";

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid documentary ID" },
        { status: 400 }
      );
    }

    const documentary = await Documentary.findById(id);

    if (!documentary) {
      return NextResponse.json(
        { success: false, message: "Documentary not found" },
        { status: 404 }
      );
    }

    // Delete all images from Cloudinary
    if (documentary.images?.length) {
      for (const img of documentary.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
    }

    // Delete document from MongoDB
    await Documentary.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Documentary deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to delete documentary" },
      { status: 500 }
    );
  }
}
