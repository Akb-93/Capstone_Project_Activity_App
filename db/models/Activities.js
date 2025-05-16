import mongoose, { Schema } from "mongoose";
import "./Categories";

const activitySchema = new Schema(
  {
    title: { type: String, required: true },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    area: { type: String },
    country: { type: String },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
