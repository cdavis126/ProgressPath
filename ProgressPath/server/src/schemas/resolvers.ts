import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Idea, Goal, User, Category } from "../models/index.js";
import { signToken } from "../services/auth.js";
import { AuthenticationError } from "apollo-server-errors";

interface Context {
  user?: {
    _id: mongoose.Types.ObjectId;
  };
}

interface SaveIdeaArgs {
  ideaData: typeof Idea;
}

interface RemoveIdeaArgs {
  ideaId: mongoose.Types.ObjectId;
}

interface CreateGoalArgs {
  title: string;
  description: string;
  category: string;
  status: "To Do" | "Active" | "Complete";
}

interface UpdateGoalArgs {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  status?: "To Do" | "Active" | "Complete";
}

const resolvers = {
  Query: {
    getUser: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in.");
      }
      return await User.findById(context.user._id).populate("goals savedIdeas");
    },
    getIdeas: async (_parent: any, { categoryId }: { categoryId?: mongoose.Types.ObjectId }) => {
      const filter = categoryId ? { category: categoryId } : {};
      return await Idea.find(filter).populate("category");
    },
    getGoals: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      return await Goal.find({ user: context.user._id }).populate("user");
    },
    getCategories: async () => {
      return await Category.find();
    },
    searchIdeas: async (_parent: any, { searchTerm }: { searchTerm: string }, { models }: { models: any }) => {
      return await models.Idea.find({
        title: { $regex: searchTerm, $options: "i" },
      }).populate("category");
    },
  },

  Mutation: {
    addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    loginUser: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email }] });
      if (!user || !(await user.isCorrectPassword(password))) throw new AuthenticationError("Invalid credentials.");
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    updateUser: async (_parent: any, args: Partial<{ password: string }>, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      if (args.password) args.password = await bcrypt.hash(args.password, 10);
      return await User.findByIdAndUpdate(context.user._id, args, { new: true, runValidators: true });
    },

    updatePassword: async (_parent: any, { password }: { password: string }, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      return await User.findByIdAndUpdate(
        context.user._id,
        { password: await bcrypt.hash(password, 10) },
        { new: true }
      );
    },

    saveIdea: async (_parent: unknown, { ideaData }: SaveIdeaArgs, context: Context) => {
      if (!context.user) {throw new AuthenticationError('You need to be logged in!');}
      return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedIdeas: ideaData } },
          { new: true, runValidators: true }
      );
    },

    removeIdea: async (_parent: unknown, { ideaId }: RemoveIdeaArgs, context: Context) => {
      if (!context.user) {throw new AuthenticationError('You need to be logged in!');}
      console.log("Attempting to remove idea with ID:", ideaId);
      const userBefore = await User.findById(context.user._id);
      console.log("Before Removal - Saved Ideas:", userBefore?.savedIdeas);
      const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedIdeas: ideaId } },
          { new: true }
      );
      console.log("After Removal - Saved Ideas:", updatedUser?.savedIdeas);
      return updatedUser;
    },

    deleteUser: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      const deletedUser = await User.findByIdAndDelete(context.user._id);
      if (!deletedUser) throw new AuthenticationError("User not found.");
      return { message: "User successfully deleted." };
    },
    
    createGoal: async (_parent: any, { title, description, category, status }: CreateGoalArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      if (!title.trim()) throw new Error("Title is required.");
      const goal = await Goal.create({ title, description, category, status, user: context.user._id });
      await User.findByIdAndUpdate(context.user._id, { $push: { goals: goal._id } });
      return await Goal.findById(goal._id).populate("user");
    },

    updateGoal: async (_parent: any, { id, title, description, category, status }: UpdateGoalArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      const goal = await Goal.findOneAndUpdate(
        { _id: id, user: context.user._id },
        { title, description, category, status },
        { new: true, runValidators: true });
      if (!goal) throw new Error("Goal not found.");
      return goal;
    },

    deleteGoal: async (_parent: any, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      const goal = await Goal.findOneAndDelete({ _id: id, user: context.user._id });
      if (!goal) throw new Error("Goal not found.");
      await User.findByIdAndUpdate(context.user._id, { $pull: { goals: id } });
      return "Goal deleted successfully.";
    },
  },

  User: {
    savedIdeas: async (parent: any) => {
      return await Idea.find({ _id: { $in: parent.savedIdeas } }).populate("category");
    }
  },
};

export default resolvers;