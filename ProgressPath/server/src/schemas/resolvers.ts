import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Idea, User, Category } from "../models/index.js";
import { signToken } from "../services/auth.js";
import { AuthenticationError } from "apollo-server-errors";

interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  savedIdeas: mongoose.Types.ObjectId[];
  hiddenIdeas: mongoose.Types.ObjectId[];
}

interface Category {
  _id: mongoose.Types.ObjectId;
  name: string;
  icon: string;
  color: string;
}

interface Idea {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: Category;
}

interface SaveIdeaArgs {
  ideaId: mongoose.Types.ObjectId;
}

interface HideIdeaArgs {
  ideaId: mongoose.Types.ObjectId;
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
    getUser: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return await User.findById(context.user._id)
        .populate("savedIdeas")
        .populate("hiddenIdeas");
    },

    getIdeas: async (
      _parent: unknown,
      { categoryId }: { categoryId?: mongoose.Types.ObjectId }
    ) => {
      const filter = categoryId ? { category: categoryId } : {};
      return await Idea.find(filter).populate("category");
    },

    getCategories: async () => {
      return await Category.find();
    },

    searchIdeas: async (_parent: unknown, { searchTerm }: { searchTerm: string }) => {
      const searchRegex = new RegExp(searchTerm, "i");
      return await Idea.find({
        $or: [{ title: { $regex: searchRegex } }, { description: { $regex: searchRegex } }],
      }).populate("category");
    },
  },

  Mutation: {
    addUser: async (_parent: unknown,{ username, email, password }: { username: string; email: string; password: string }
    ): Promise<{ token: string; user: User }> => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user: await user.populate("savedIdeas hiddenIdeas") };
    },

    loginUser: async (_parent: unknown,{ email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ $or: [{ username: email }, { email }] });
      if (!user) throw new AuthenticationError("Can't find this user");
      if (!(await user.isCorrectPassword(password))) throw new AuthenticationError("Wrong password!");
      const token = signToken(user.username, user.email, user._id);
      return { token, user: await user.populate("savedIdeas hiddenIdeas") };
    },

    updateUser: async (_parent: unknown, args: UpdateUserInput, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in to update your profile.");
      if (args.password) args.password = await bcrypt.hash(args.password, 10);
      return await User.findByIdAndUpdate(context.user._id, args, {
        new: true,
        runValidators: true,
      }).populate("savedIdeas hiddenIdeas");
    },

    updatePassword: async (_parent: unknown, { password }: { password: string }, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in!");
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.findByIdAndUpdate(context.user._id, { password: hashedPassword }, { new: true });
    },

    logoutUser: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in!");
      return true;
    },

    toggleSaveIdea: async (_parent: unknown, { ideaId }: SaveIdeaArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in!");
      const user = await User.findById(context.user._id);
      if (!user) throw new AuthenticationError("User not found!");

      const alreadySaved = user.savedIdeas.includes(ideaId);
      const update = alreadySaved
        ? { $pull: { savedIdeas: ideaId } }
        : { $addToSet: { savedIdeas: ideaId } };

      return await User.findByIdAndUpdate(context.user._id, update, { new: true }).populate("savedIdeas hiddenIdeas");
    },

    toggleHideIdea: async (_parent: unknown, { ideaId }: HideIdeaArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in!");
      const user = await User.findById(context.user._id);
      if (!user) throw new AuthenticationError("User not found!");

      const alreadyHidden = user.hiddenIdeas.includes(ideaId);
      const update = alreadyHidden
        ? { $pull: { hiddenIdeas: ideaId } }
        : { $addToSet: { hiddenIdeas: ideaId } };

      return await User.findByIdAndUpdate(context.user._id, update, { new: true }).populate("savedIdeas hiddenIdeas");
    },

    deleteUser: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in!");

      const deletedUser = await User.findByIdAndDelete(context.user._id);
      if (!deletedUser) throw new AuthenticationError("User not found!");

      return { message: "User successfully deleted." };
    },
  },
};

export default resolvers;

