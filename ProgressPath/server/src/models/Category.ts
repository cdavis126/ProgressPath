import mongoose, { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: 'Mindset' | 'Creativity' | 'Well-Being' | 'Nutrition' | 'Growth' | 'Fitness' | 'Productivity';
}

const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
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

categorySchema.index({ name: 1 });

const Category = model<CategoryDocument>('Category', categorySchema);
export default Category;
