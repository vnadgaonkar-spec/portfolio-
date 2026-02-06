// src/app/api/work/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb.js";
import Work from "../../../../models/Work.js";

export async function GET(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params; // ✅ FIX

    console.log("📥 Fetching work by id:", id);

    const work = await Work.findById(id).lean();

    if (!work) {
      console.error("❌ Work not found:", id);
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: work,
    });
  } catch (err) {
    console.error("🔥 Get work by id error");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
