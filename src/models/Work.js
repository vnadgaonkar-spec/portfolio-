import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Work || mongoose.model("Work", WorkSchema);