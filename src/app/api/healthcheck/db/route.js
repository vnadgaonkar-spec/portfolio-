// app/api/test-db
import mongoose from "mongoose";
import dbConnect from "../../../lib/mongodb.js";

export async function GET() {
  try {
    await dbConnect();

    return Response.json({
      success: true,
      message: "MongoDB connected",
      db: mongoose.connection.name,
      state: mongoose.connection.readyState, // 1 = connected
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
