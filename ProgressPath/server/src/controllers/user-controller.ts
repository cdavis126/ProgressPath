import type { Request, Response } from 'express';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';

// Get single user by their ID or username (and populate saved and skipped ideas)
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const foundUser = await User.findOne({
      $or: [
        { _id: req.user ? req.user._id : req.params.id },
        { username: req.params.username },
      ],
    })
      .select('-__v')
      .populate('savedIdeas')
      .populate('skippedIdeas');

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id or username!' });
    }

    return res.json(foundUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Create a user, sign a token, and send it back (to signup form)
export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  if (!user) {
    return res.status(400).json({ message: 'Something is wrong!' });
  }
  const token = signToken(user.username, user.password, user._id);
  return res.json({ token, user });
};

// Login a user, sign a token, and send it back (to login form)
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }
  const correctPw = await user.isCorrectPassword(req.body.password);
  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }
  const token = signToken(user.username, user.password, user._id);
  return res.json({ token, user });
};

// Update existing user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!dbUserData) {
      return res.status(404).json({ message: 'No user with this ID' });
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

    if (!dbUserData) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};