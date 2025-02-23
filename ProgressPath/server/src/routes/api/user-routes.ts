import express from 'express';
import { getSingleUser, createUser, updateUser, deleteUser, login } from '../../controllers/user-controller.js';
import { authenticateToken } from '../../services/auth.js';

const router = express.Router();

// Create a new user
router.post('/', authenticateToken, createUser);

// Get single user
router.get('/:userId', authenticateToken, getSingleUser);

// Update user
router.put('/:userId', authenticateToken, updateUser);

// Delete user
router.delete('/:userId', authenticateToken, async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.route('/login').post(login);

// Forgot password / reset password routes
router.post('/forgot-password', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: 'Error processing password reset request' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Update user profile and password
router.put('/:userId/profile', authenticateToken, async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

router.put('/:userId/password', authenticateToken, async (req, res) => {
  try {
    // Validate old password, hash new password)
  } catch (err) {
    res.status(500).json({ message: 'Error updating password' });
  }
});


export default router;
