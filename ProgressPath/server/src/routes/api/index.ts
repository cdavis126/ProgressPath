import express from 'express';
import userRoutes from './user-routes.js';
import ideaRoutes from './idea-routes.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/ideas', ideaRoutes);

export default router;