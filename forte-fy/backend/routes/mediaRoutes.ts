import express from 'express';
import { uploadMedia, getMedia, upload } from '../controllers/mediaController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', authenticate, upload.single('media'), uploadMedia);
router.get('/', authenticate, getMedia);

export default router;
