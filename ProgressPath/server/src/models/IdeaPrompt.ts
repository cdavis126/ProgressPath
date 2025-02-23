import { Schema, type Document } from 'mongoose';

export interface IdeaPromptDocument extends Document {
  title: string;
  description: string;
  image: string;
  category: Schema.Types.ObjectId;
  heartIcon: boolean;
  skipIcon: boolean;
}

const ideaPromptSchema = new Schema<IdeaPromptDocument>({
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
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  heartIcon: {
    type: Boolean,
    default: false,
  },
  skipIcon: {
    type: Boolean,
    default: false,
  },
});

export default ideaPromptSchema;
