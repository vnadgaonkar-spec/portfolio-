import mongoose from "mongoose";

const CATEGORIES = ["Beauty", "Fashion", "Celebrities", "Food", "Travel", "Others"];

const MagazineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issue: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
      default: "Others",
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Magazine ||
  mongoose.model("Magazine", MagazineSchema);