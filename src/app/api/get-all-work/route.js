// src/app/api/work/get-all/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb.js";
import Work from "../../../models/Work.js";

export async function GET() {
  try {
    await dbConnect();

    console.log("📥 Fetching all work...");

    const works = await Work.find({})
      .sort({ createdAt: -1 })
      .select("category images")
      .lean();

    console.log("✅ Work fetched:", works.length);

    const data = works.map((work) => ({
      _id: work._id,
      category: work.category,
      images: work.images || [],
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("🔥 Get-all work error");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}