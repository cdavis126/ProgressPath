import fs from 'fs';
import db from '../config/connection.js';
import { Idea, User, Category } from '../models/index.js';
import cleanDB from './cleanDB.js';
import process from 'process';

const userDataPath = './dist/seeds/userData.json';
const ideaDataPath = './dist/seeds/ideaData.json';
const categoryDataPath = './dist/seeds/categoryData.json';

// Read the JSON files
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
const ideaData = JSON.parse(fs.readFileSync(ideaDataPath, 'utf-8'));
const categoryData = JSON.parse(fs.readFileSync(categoryDataPath, 'utf-8'));

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // Seed Categories
    for (const category of categoryData) {
      const existingCategory = await Category.findOne({ name: category.name });
      if (!existingCategory) {
        await Category.create(category);
        console.log(`Category '${category.name}' created.`);
      }
    }
    const ideasToSeed = await Promise.all(ideaData.map(async (idea: { category: any; }) => {
      const category = await Category.findOne({ name: idea.category });
      if (category) {
        return {
          ...idea,
          category: category._id,
        };
      }
    }));

    // Seed Ideas
    await Idea.insertMany(ideasToSeed.filter((idea) => idea !== undefined));

    // Seed Users
    await User.create(userData);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();