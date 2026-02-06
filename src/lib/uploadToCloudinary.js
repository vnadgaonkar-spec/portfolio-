import cloudinary from "./cloudinary.js";

export async function uploadToCloudinary(file, folder = "photo_portfolio") {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",

        // 👇 only affects images
        format: "webp",
        transformation: [
          {
            quality: 90, // high quality
            strip_profile: true, // remove EXIF/metadata
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          type: result.resource_type,
        });
      }
    ).end(buffer);
  });
}
