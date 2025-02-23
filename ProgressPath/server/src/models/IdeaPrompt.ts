import { Schema, model, Document } from 'mongoose';

export interface IdeaPromptDocument extends Document {
  title: string;
  description: string;
  image: string;
  category: Schema.Types.ObjectId;
  savedIdeas: boolean;
  skippedIdeas: boolean;
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
  savedIdeas: {
    type: Boolean,
    default: false,
  },
  skippedIdeas: {
    type: Boolean,
    default: false,
  },
});

const IdeaPrompt = model<IdeaPromptDocument>('IdeaPrompt', ideaPromptSchema);

export default IdeaPrompt;

