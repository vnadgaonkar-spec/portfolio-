// src/models/Work.js
import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String, // flexible
      required: true,
    },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Work ||
  mongoose.model("Work", WorkSchema);
