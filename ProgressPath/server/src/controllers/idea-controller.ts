import IdeaPrompt from "../models/IdeaPrompt.js";
import User from "../models/User.js";
import { Request, Response } from "express";

// Get all idea prompts
export const getIdeas = async (_req: Request, res: Response) => {
  try {
    const ideaPrompts = await IdeaPrompt.find().sort({ createdAt: -1 });
    res.json(ideaPrompts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Get single idea prompt by ID
export const getSingleIdeaPrompt = async (req: Request, res: Response) => {
  try {
    const ideaPrompt = await IdeaPrompt.findById(req.params.ideaId);
    if (!ideaPrompt) {
      return res.status(404).json({ message: "No idea prompt with this id!" });
    }
    res.json(ideaPrompt);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Get idea prompts by category
export const getIdeaPromptsByCategory = async (req: Request, res: Response) => {
  try {
    const ideaPrompts = await IdeaPrompt.find({ category: req.params.categoryId }).sort({ createdAt: -1 });
    if (ideaPrompts.length === 0) {
      return res.status(404).json({ message: "No idea prompts found for this category!" });
    }
    res.json(ideaPrompts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Save an idea prompt (add to user's saved ideas)
export const saveIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const ideaPrompt = await IdeaPrompt.findById(req.params.ideaId);
    if (!ideaPrompt) {
      return res.status(404).json({ message: "Idea prompt not found!" });
    }

    if (user.savedIdeas.some((idea: any) => idea.toString() === (ideaPrompt!._id as string).toString())) {
      return res.status(400).json({ message: "Idea already saved!" });
    }

    // Add the idea prompt to the saved ideas list
    user.savedIdeas.push(ideaPrompt._id as any);
    await user.save();

    res.json({ message: "Idea saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Remove saved idea prompt (remove from user's saved ideas)
export const removeSavedIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.savedIdeas = user.savedIdeas.filter((idea: any) => idea.toString() !== req.params.ideaId);
    await user.save();

    res.json({ message: "Saved idea removed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Skip an idea prompt (add to user's skipped ideas)
export const skipIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const ideaPrompt = await IdeaPrompt.findById(req.params.ideaId);
    if (!ideaPrompt) {
      return res.status(404).json({ message: "Idea prompt not found!" });
    }

    if (user.skippedIdeas.some((idea: any) => idea.toString() === (ideaPrompt._id as string).toString())) {
      return res.status(400).json({ message: "Idea already skipped!" });
    }

    user.skippedIdeas.push(ideaPrompt._id as any);
    await user.save();

    res.json({ message: "Idea skipped successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};


