import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Magazine from "../../../models/Magazine";

export async function GET() {
  try {
    await dbConnect();

    const magazines = await Magazine.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: magazines });
  } catch (err) {
    console.error("Get magazine error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}