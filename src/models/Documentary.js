import mongoose from "mongoose";

const CreditSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const DocumentarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    content: {
      type: String, // TinyMCE HTML
      required: true,
    },

    coverImage: {
      type: String, // Cloudinary URL
      required: true,
    },

    credits: {
      type: [CreditSchema],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    status: {
      type: String,
      enum: ["published"],
      default: "published",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Documentary ||
  mongoose.model("Documentary", DocumentarySchema);
