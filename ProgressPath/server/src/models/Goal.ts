import mongoose, { Schema, Document, Model } from "mongoose";

export interface Goal extends Document {
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Active" | "Complete";
  user: mongoose.Types.ObjectId;
}

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "Misc.",
    },
    status: {
      type: String,
      enum: ["To Do", "Active", "Complete"],
      default: "To Do",
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
);

const Goal: Model<Goal> = mongoose.model<Goal>("Goal", goalSchema);
export default Goal;
