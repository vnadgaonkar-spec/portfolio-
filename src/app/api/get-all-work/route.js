// src/app/api/get-all-work/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb.js";
import Work from "../../../models/Work.js";

export async function GET() {
  try {
    await dbConnect();

    const works = await Work.find({})
      .sort({ order: 1, createdAt: -1 }) // order first, then createdAt as fallback
      .select("category images order")
      .lean();

    const data = works.map((work) => ({
      _id: work._id,
      category: work.category,
      images: work.images || [],
      order: work.order,
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}