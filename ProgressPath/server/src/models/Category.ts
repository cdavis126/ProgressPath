import mongoose, { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  icon: string;
  color: string;
}

const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'Misc',
      'Mindset',
      'Creativity',
      'Well-Being',
      'Nutrition',
      'Growth',
      'Fitness',
      'Productivity',
    ],
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Category = model<CategoryDocument>('Category', categorySchema);
export default Category;
