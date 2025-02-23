import { Schema, model, Document } from 'mongoose';

export interface IdeaPromptDocument extends Document {
  title: string;
  description: string;
  image: string;
  category: Schema.Types.ObjectId;
  saveIdeas: boolean;
  skipIdeas: boolean;
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
  saveIdeas: {
    type: Boolean,
    default: false,
  },
  skipIdeas: {
    type: Boolean,
    default: false,
  },
});

const IdeaPrompt = model<IdeaPromptDocument>('IdeaPrompt', ideaPromptSchema);

export default IdeaPrompt;

