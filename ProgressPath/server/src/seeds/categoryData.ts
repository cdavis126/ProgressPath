import { Category } from '../models';

const seedCategory = async (): Promise<void> => {
  try {
    const categories = [
      { _id: 1, name: 'Mindset' },
      { _id: 2, name: 'Creativity' },
      { _id: 3, name: 'Well-Being' },
      { _id: 4, name: 'Nutrition' },
      { _id: 5, name: 'Growth' },
      { _id: 6, name: 'Fitness' },
      { _id: 7, name: 'Productivity' },
    ];

    for (const { _id, name } of categories) {
      const existingCategory = await Category.findOne({ name });

      if (!existingCategory) {
        const category = new Category({ _id, name });
        await category.save();
        console.log(`Category created: ${name}`);
      } else {
        console.log(`Category already exists: ${name}`);
      }
    }

    console.log('Category seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

export default seedCategory;


