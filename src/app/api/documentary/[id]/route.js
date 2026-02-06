import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Documentary from "../../../../models/Documentary";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;

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

    return NextResponse.json(
      { success: true, data: documentary },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch documentary" },
      { status: 500 }
    );
  }
}
