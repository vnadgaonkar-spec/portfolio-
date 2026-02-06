import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb.js";
import Magazine from "../../../../../models/Magazine.js";
import { magazineSchema } from "../../../../../lib/validators/magazineSchema.js";
import { uploadToCloudinary } from "../../../../../lib/uploadToCloudinary.js";

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const title = formData.get("title");
    const issue = formData.get("issue");
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );
    }

    const uploaded = await uploadToCloudinary(file);

    const payload = {
      title,
      issue,
      image: {
        url: uploaded.url,
        public_id: uploaded.public_id,
      },
    };

    const parsed = magazineSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const magazine = await Magazine.create(parsed.data);

    return NextResponse.json({ success: true, data: magazine });
  } catch (err) {
    console.error("Create magazine error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}