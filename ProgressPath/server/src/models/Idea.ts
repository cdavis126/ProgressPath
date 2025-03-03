import mongoose, { Schema, model, Document } from "mongoose";

export interface IdeaDocument extends Document {
  title: string;
  description: string;
  category: mongoose.Types.ObjectId;
}

const ideaSchema = new Schema<IdeaDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }
  }
);

ideaSchema.index({ category: 1 });

const Idea = model<IdeaDocument>("Idea", ideaSchema);
export default Idea;



