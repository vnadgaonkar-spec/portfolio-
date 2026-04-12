// src/app/api/admin/work/reorder/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb.js";
import Work from "../../../../../models/Work.js";

export async function PATCH(req) {
  try {
    await dbConnect();

    const { works } = await req.json();

    if (!Array.isArray(works)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    // Bulk update — set new order and new images array for each work
    await Promise.all(
      works.map((w, index) =>
        Work.findByIdAndUpdate(w._id, {
          order: index,
          images: w.images,
        })
      )
    );

    return NextResponse.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error("🔥 Reorder error:", err.message);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}