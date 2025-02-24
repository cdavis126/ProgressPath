import db from '../config/connection.js';
import cleanDB from './cleanDB.js';
import seedCategories from './categoryData.js';
import { seedUsers } from './userData.js';
import { seedIdeaPrompts } from './ideaData.js';

const seedDatabase = async (): Promise<void> => {
  
  try {
    await db();
    await cleanDB();

    // Seed Categories
    await seedCategories();
    console.log('Categories seeded successfully!');

    // Seed Users
    await seedUsers();
    console.log('Users seeded successfully!');

    // Seed Idea Prompts
    await seedIdeaPrompts();
    console.log('Idea Prompts seeded successfully!');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();