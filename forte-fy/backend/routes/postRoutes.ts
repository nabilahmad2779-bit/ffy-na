import express from 'express';
import { createPost, getPosts, getPostBySlug, updatePost, deletePost } from '../controllers/postController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, authorize(['admin', 'editor']), deletePost);

export default router;
