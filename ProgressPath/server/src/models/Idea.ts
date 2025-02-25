import mongoose, { Schema, Document } from 'mongoose';

export interface IdeaDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
}

const ideaSchema = new Schema<IdeaDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

ideaSchema.index({ category: 1 });

const Idea = mongoose.model<IdeaDocument>('Idea', ideaSchema);
export default Idea;



