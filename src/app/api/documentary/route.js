import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Documentary from "@/models/Documentary";

export async function GET() {
  try {
    await dbConnect();

    const documentaries = await Documentary.find({})
      .sort({ createdAt: -1 })
      .select(
        "title coverImage tags createdAt"
      );

    return NextResponse.json(
      {
        success: true,
        data: documentaries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch documentaries",
      },
      { status: 500 }
    );
  }
}
