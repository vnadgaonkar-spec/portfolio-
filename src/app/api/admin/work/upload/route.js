import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb.js";
import Work from "../../../../../models/Work.js";
import { workSchema } from "../../../../../lib/validators/workSchema.js";
import { uploadToCloudinary } from "../../../../../lib/uploadToCloudinary.js";

export async function POST(req) {

  try {
    await dbConnect();
    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const files = formData.getAll("files");

    const payload = {
      title,
      category,
      images: [],
    };


    let index = 0;
    for (const file of files) {
      const uploaded = await uploadToCloudinary(file);


      payload.images.push({
        url: uploaded.url,
        public_id: uploaded.public_id,
      });

      index++;
    }


    const parsed = workSchema.safeParse(payload);

    if (!parsed.success) {
      console.error("❌ Validation failed", parsed.error);
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: work });
  } catch (err) {
    console.error("❌ Create work error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}