import { User, Idea, Category } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {

    await User.deleteMany({});
    console.log('User collection cleaned.');

    await Idea.deleteMany({});
    console.log('Ideas collection cleaned.');

    await Category.deleteMany({});
    console.log('Category collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;