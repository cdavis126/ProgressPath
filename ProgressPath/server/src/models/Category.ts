import { Schema, model, type Document } from 'mongoose';

export interface CategoryDocument extends Document {
  _id: number;
  name: string;
}

const categorySchema = new Schema<CategoryDocument>({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'Mindset',
      'Creativity',
      'Well-Being',
      'Nutrition',
      'Growth',
      'Fitness',
      'Productivity',
    ],
  },
});

const Category = model<CategoryDocument>('Category', categorySchema);

export default Category;

