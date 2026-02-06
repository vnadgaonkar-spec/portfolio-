import cloudinary from "./cloudinary.js";

export async function deleteFromCloudinary(public_id) {
  return cloudinary.uploader.destroy(public_id, {
    resource_type: "image",
  });
}
