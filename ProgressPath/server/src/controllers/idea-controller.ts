import { Request, Response } from 'express';
import { User, IdeaPrompt, Category } from '../models/index.js';

// Get all idea prompts
export const getIdeas = async (req: Request, res: Response) => {
  try {
    const ideas = await IdeaPrompt.find().populate('category');
    return res.json(ideas);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Get a single idea prompt
export const getSingleIdeaPrompt = async (req: Request, res: Response) => {
  try {
    const idea = await IdeaPrompt.findById(req.params.id).populate('category');
    if (!idea) {
      return res.status(404).json({ message: "Idea not found!" });
    }
    return res.json(idea);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Get idea prompts by category
export const getIdeaPromptsByCategory = async (req: Request, res: Response) => {
  try {
    const ideaPrompts = await IdeaPrompt.find({ category: req.params.categoryId }).populate('category');
    return res.json(ideaPrompts);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Save an idea prompt (add to user's saved ideas)
export const saveIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    const ideaPrompt = await IdeaPrompt.findById(req.params.ideaId);
    if (!ideaPrompt) {
      return res.status(404).json({ message: "Idea prompt not found!" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { savedIdeas: ideaPrompt._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Remove saved idea prompt
export const removeSavedIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { savedIdeas: req.params.ideaId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Skip an idea prompt
export const skipIdea = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    const ideaPrompt = await IdeaPrompt.findById(req.params.ideaId);
    if (!ideaPrompt) {
      return res.status(404).json({ message: "Idea prompt not found!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { skippedIdeas: ideaPrompt._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};