import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Idea, User, Category } from '../models/index.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-errors';

// Define types
interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  savedIdeas: mongoose.Types.ObjectId[];
}
interface Idea {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
}
interface SaveIdeaArgs {
  ideaData: mongoose.Types.ObjectId;
}
interface RemoveIdeaArgs {
  _id: mongoose.Types.ObjectId;
}
interface Context {
  user?: User;
}

interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
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
    searchIdeas: async (_parent: unknown, { searchTerm }: { searchTerm: string }) => {
      const searchRegex = new RegExp(searchTerm, 'i');
      const ideas = await Idea.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      })
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
      const populatedUser = await user.populate('savedIdeas');
      return { token, user: populatedUser.toObject() as User };
    },
    addUser: async (_parent: unknown, { username, email, password }: { username: string, email: string, password: string }): Promise<{ token: string, user: User }> => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      const populatedUser = await user.populate('savedIdeas');
      return { token, user: populatedUser.toObject() as User };
    },
    updateUser: async (_: unknown, { username, email, password }: UpdateUserInput, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to update your profile.");
      }

      const updatedFields: UpdateUserInput = {};
      if (username) updatedFields.username = username;
      if (email) updatedFields.email = email;
      if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        updatedFields,
        { new: true, runValidators: true }
      ).populate('savedIdeas');

      return updatedUser;
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