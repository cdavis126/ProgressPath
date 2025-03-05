import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Idea, Goal, User, Category } from "../models/index.js";
import { signToken } from "../services/auth.js";
import { AuthenticationError } from "apollo-server-errors";
import { GraphQLContext } from "../types/express/index.js";

interface Context {
  user?: {
    _id: mongoose.Types.ObjectId;
  };
}

interface SaveIdeaArgs {
  ideaId: mongoose.Types.ObjectId;
}

interface HideIdeaArgs {
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
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      return await User.findById(context.user._id).populate("goals savedIdeas hiddenIdeas");
    },

    getIdeas: async (_parent: any, { categoryId }: { categoryId?: mongoose.Types.ObjectId }) => {
      const filter = categoryId ? { category: categoryId } : {};
      return await Idea.find(filter).populate("category");
    },

    getGoals: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      return await Goal.find({ user: context.user._id });
    },

    getCategories: async () => {
      return await Category.find();
    },

    searchIdeas: async (_parent: any, { searchTerm }: { searchTerm: string }) => {
      return await Idea.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { description: { $regex: new RegExp(searchTerm, "i") } },
        ],
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
      if (!user) throw new AuthenticationError("Can't find this user");
      if (!(await user.isCorrectPassword(password))) throw new AuthenticationError("Wrong password.");
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    updateUser: async (_parent: any, args: Partial<{ password: string }>, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in to update your profile.");
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

    logoutUser: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      return true;
    },

    deleteUser: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      const deletedUser = await User.findByIdAndDelete(context.user._id);
      if (!deletedUser) throw new AuthenticationError("User not found.");
      return { message: "User successfully deleted." };
    },

    toggleSaveIdea: async (_parent: any, { ideaId }: SaveIdeaArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedIdeas: ideaId } },
        { new: true }
      );
    },

    toggleHideIdea: async (_parent: any, { ideaId }: HideIdeaArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You need to be logged in.");
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { hiddenIdeas: ideaId } },
        { new: true }
      );
    },

    createGoal: async (_parent: any, { title, description, category, status }: CreateGoalArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      if (!title.trim()) throw new Error("Title is required.");
      try {
        const goal = await Goal.create({ title, description, category, status, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { goals: goal._id } });
        return goal;
      } catch (error) {
        console.error("Error creating goal:", error);
        throw new Error("Failed to create goal.");
      }
    },

    updateGoal: async (_parent: any, { id, title, description, category, status }: UpdateGoalArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
      const goal = await Goal.findOneAndUpdate(
        { _id: id, user: context.user._id },
        { title, description, category, status },
        { new: true, runValidators: true }
      );
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
};

export default resolvers;


