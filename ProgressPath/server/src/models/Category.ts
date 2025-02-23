import { Schema, model, type Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
}

const categorySchema = new Schema<CategoryDocument>({
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
