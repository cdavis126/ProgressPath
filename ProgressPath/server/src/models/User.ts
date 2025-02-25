import mongoose, { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Import schema from IdeaPrompt.js
import ideasSchema from './Idea.js';
import type { IdeaDocument } from './Idea.js';

export interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  savedIdeas: IdeaDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  ideaCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedIdeas: [ideasSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('ideaCount').get(function () {
  return this.savedIdeas.length;
});

const User = model<UserDocument>('User', userSchema);
export default User;

