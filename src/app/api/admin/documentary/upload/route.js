import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Documentary from "../../../../../models/Documentary.js";
import { documentarySchema } from "../../../../../lib/validators/documentarySchema.js";
import { uploadToCloudinary } from "../../../../../lib/uploadToCloudinary";


export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // 🔹 get multiple images
    const files = formData.getAll("images");

    // ✅ minimum 1 image validation
    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image is required",
        },
        { status: 400 }
      );
    }

    // 🔹 build payload (NO coverImage here)
    const payload = {
      title: formData.get("title"),
      subject: formData.get("subject"),
      location: formData.get("location"),
      content: formData.get("content"),
      credits: JSON.parse(formData.get("credits") || "[]"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    // 🔒 Zod validation (text only)
    const validated = documentarySchema.parse(payload);

    // ☁️ upload images to Cloudinary
    const uploads = [];

    for (const file of files) {
      const uploaded = await uploadToCloudinary(file, "documentary");
      uploads.push({
        url: uploaded.url,
        public_id: uploaded.public_id,
        type: uploaded.type || "image",
      });
    }

    // 💾 save to MongoDB
    const doc = await Documentary.create({
      ...validated,
      images: uploads,
      coverImage: uploads[0].url,            // first image as cover
      coverImagePublicId: uploads[0].public_id,
    });

    return NextResponse.json(
      {
        success: true,
        data: doc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}

