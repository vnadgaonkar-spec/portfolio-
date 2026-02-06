import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb.js";
import Work from "../../../../../models/Work.js";
import { workSchema } from "../../../../../lib/validators/workSchema.js";
import { uploadToCloudinary } from "../../../../../lib/uploadToCloudinary.js";

export async function POST(req) {
  console.time("TOTAL_REQUEST");

  try {
    console.log("▶ Step 1: DB connect start");
    console.time("DB_CONNECT");
    await dbConnect();
    console.timeEnd("DB_CONNECT");
    console.log("✔ Step 1: DB connected");

    console.log("▶ Step 2: Read formData");
    console.time("FORMDATA");
    const formData = await req.formData();
    console.timeEnd("FORMDATA");

    const title = formData.get("title");
    const category = formData.get("category");
    const files = formData.getAll("files");

    console.log("✔ Step 2 data:", {
      title,
      category,
      filesCount: files.length,
    });

    const payload = {
      title,
      category,
      images: [],
    };

    console.log("▶ Step 3: Start Cloudinary uploads");

    let index = 0;
    for (const file of files) {
      console.log(
        `⏫ Upload ${index + 1}/${files.length}`,
        file.name,
        `${(file.size / 1024 / 1024).toFixed(2)}MB`
      );

      console.time(`UPLOAD_${index}`);
      const uploaded = await uploadToCloudinary(file);
      console.timeEnd(`UPLOAD_${index}`);

      console.log("✔ Uploaded:", uploaded.public_id);

      payload.images.push({
        url: uploaded.url,
        public_id: uploaded.public_id,
      });

      index++;
    }

    console.log("✔ Step 3: All uploads finished");

    console.log("▶ Step 4: Zod validation");
    console.time("VALIDATION");
    const parsed = workSchema.safeParse(payload);
    console.timeEnd("VALIDATION");

    if (!parsed.success) {
      console.error("❌ Validation failed", parsed.error);
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    console.log("✔ Step 4: Validation OK");

    console.log("▶ Step 5: MongoDB create");
    console.time("DB_CREATE");
    const work = await Work.create(parsed.data);
    console.timeEnd("DB_CREATE");

    console.log("✔ Step 5: Work saved");

    console.timeEnd("TOTAL_REQUEST");
    return NextResponse.json({ success: true, data: work });

  } catch (err) {
    console.timeEnd("TOTAL_REQUEST");
    console.error("❌ Create work error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}