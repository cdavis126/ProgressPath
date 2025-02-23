import express from 'express';
import { getIdeas, getSingleIdeaPrompt, getIdeaPromptsByCategory, saveIdea, removeSavedIdea, skipIdea } from '../../controllers/idea-controller.js';
import { authenticateToken } from '../../services/auth.js';

const router = express.Router();

// Get all idea prompts
router.get('/', getIdeas);

// Get single idea prompt by ID
router.get('/:ideaId', getSingleIdeaPrompt);

// Get idea prompts by category
router.get('/category/:categoryId', getIdeaPromptsByCategory);

// Save an idea prompt
router.post('/:ideaId/save', authenticateToken, saveIdea);

// Remove saved idea prompt
router.delete('/:ideaId/save', authenticateToken, removeSavedIdea);

// Skip an idea prompt
router.post('/:ideaId/skip', authenticateToken, skipIdea);

export default router;
