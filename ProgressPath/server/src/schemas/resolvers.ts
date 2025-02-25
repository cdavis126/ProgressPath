import mongoose from 'mongoose';
import { Idea, User, Category } from '../models/index.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-errors';

// Define types
interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  ideaCount: number;
  savedIdeas: Idea[];
}
interface Idea {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
}
interface SaveIdeaArgs {
  ideaData: Idea;
}
interface RemoveIdeaArgs {
  _id: mongoose.Types.ObjectId;
}
interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findOne({ _id: context.user._id }).populate('savedIdeas');
      return user as User | null;
    },
    getIdeas: async (_parent: unknown, { categoryId }: { categoryId?: mongoose.Types.ObjectId }, context: Context) => {
      let filter = {};

      if (categoryId) {
        filter = { category: categoryId };
      }

      const ideas = await Idea.find(filter).populate('category');
      return ideas;
    },
  },

  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string, password: string }): Promise<{ token: string, user: User }> => {
      const user = await User.findOne({ $or: [{ username: email }, { email }] });
      if (!user) {
        throw new AuthenticationError(`Can't find this user`);
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user.toObject() as User };
    },
    addUser: async (_parent: unknown, { username, email, password }: { username: string, email: string, password: string }): Promise<{ token: string, user: User }> => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user.toObject() as User };
    },
    saveIdea: async (_parent: unknown, { ideaData }: SaveIdeaArgs, context: Context): Promise<User | null> => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedIdeas: ideaData } },
        { new: true, runValidators: true }
      );
    },
    removeIdea: async (_parent: unknown, { _id }: RemoveIdeaArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedIdeas: _id } },
        { new: true }
      );
      if (!user) {
        throw new AuthenticationError('User not found!');
      }
      return user;
    }
  },
};

export default resolvers;