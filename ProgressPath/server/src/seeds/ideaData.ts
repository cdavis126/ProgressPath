import { Idea, Category } from '../models';

export const seedIdea = async (): Promise<void> => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      console.log('No categories found. Please seed categories first.');
      return;
    }

    const ideaPrompts = [
      {
        title: 'Mindset',
        description: 'Mindset plays a key role in shaping personal success.',
        image: '/client/src/assets/Mindset/Mind.png',
        category: categories.find(c => c.name === 'Mindset')?._id,
      },
      {
        title: 'Creativity',
        description: 'Explore various strategies to enhance creative thinking.',
        image: '/client/src/assets/Creativity/MultipleLightBulbs.png',
        category: categories.find(c => c.name === 'Creativity')?._id,
      },
      {
        title: 'Well-Being',
        description: 'Important well-being practices to improve quality of life.',
        image: '/client/src/assets/WellBeing/StressManagement.png',
        category: categories.find(c => c.name === 'Well-Being')?._id,
      },
      {
        title: 'Nutrition',
        description: 'Understanding the role of nutrition in overall health.',
        image: '/client/src/assets/Nutrition/Diet.png',
        category: categories.find(c => c.name === 'Nutrition')?._id,
      },
      {
        title: 'Growth',
        description: 'How a growth mindset leads to ongoing learning and personal growth.',
        image: '/client/src/assets/Growth/Journaling.png',
        category: categories.find(c => c.name === 'Growth')?._id,
      },
      {
        title: 'Fitness',
        description: 'Tips for staying motivated to achieve fitness goals.',
        image: '/client/src/assets/Fitness/Exercise.png',
        category: categories.find(c => c.name === 'Fitness')?._id,
      },
      {
        title: 'Productivity',
        description: 'Effective strategies to enhance productivity in everyday activities.',
        image: '/client/src/assets/Productivity/Planner.png',
        category: categories.find(c => c.name === 'Productivity')?._id,
      },
    ];

    await Idea.insertMany(ideaPrompts);

    console.log('Idea Prompts seeded successfully!');
  } catch (error) {
    console.error('Error seeding idea prompts:', error);
  }
};
