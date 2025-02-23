import { IdeaPrompt, User, Category } from '../models/index.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-errors';

// Define types
interface IdeaPrompt {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  saveIdea: boolean;
  skipIdea: boolean;
}
interface User {
  _id: string;
  username: string;
  email: string;
  savedIdeas: IdeaPrompt[];
  skippedIdeas: IdeaPrompt[];
}
interface SaveIdeaArgs {
  ideaData: IdeaPrompt;
}
interface SkipIdeaArgs {
  ideaId: string;
}
interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    // Get all idea prompts
    getAllIdeas: async (_parent: unknown, _args: unknown, _context: Context) => {
      return await IdeaPrompt.find().populate('category');
    },

    // Get idea prompts by category ID
    getIdeaPromptsByCategory: async (_parent: unknown, { categoryId }: { categoryId: string }, _context: Context) => {
      return await IdeaPrompt.find({ category: categoryId }).populate('category');
    },

    // Find current logged-in user
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findOne({ _id: context.user._id }).populate('savedIdeas').populate('skippedIdeas');
      return user;
    },
  },

  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email }] });
      if (!user) {
        throw new AuthenticationError('Can\'t find this user');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user.toObject() };
    },
    addUser: async (_parent: unknown, { username, email, password }: { username: string, email: string, password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user.toObject() };
    },
    saveIdea: async (_parent: unknown, { ideaData }: { ideaData: { title: string, description: string, image: string, categoryId: string, saveIdea: boolean, skipIdea: boolean } }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const category = await Category.findById(ideaData.categoryId);
      if (!category) {
        throw new AuthenticationError('Category not found!');
      }
      const ideaPrompt = await IdeaPrompt.create({ ...ideaData, category: category._id });
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedIdeas: ideaPrompt._id } },
        { new: true, runValidators: true }
      ).populate('savedIdeas');
      if (!user) {
        throw new AuthenticationError('User not found!');
      }
      return user;
    },
    removeIdea: async (_parent: unknown, { ideaId }: { ideaId: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedIdeas: ideaId } },
        { new: true }
      );
      if (!user) {
        throw new AuthenticationError('User not found!');
      }
      return user;
    },
    skipIdea: async (_parent: unknown, { ideaId }: { ideaId: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { skippedIdeas: ideaId } },
        { new: true }
      );
      if (!user) {
        throw new AuthenticationError('User not found!');
      }
      return user;
    }
  }
};
export default resolvers;
