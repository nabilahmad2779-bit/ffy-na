import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Response } from 'express';
import db from '../config/db.js';
import { AuthRequest } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDFs are allowed'));
  }
});

export const uploadMedia = async (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { filename, mimetype, size } = req.file;
  const url = `/uploads/${filename}`;
  const uploaded_by = req.user?.id;

  try {
    const result = await db.query(
      'INSERT INTO media (filename, url, mimetype, size, uploaded_by) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [filename, url, mimetype, size, uploaded_by]
    );
    res.status(201).json({
      message: 'Media uploaded successfully',
      media: { id: result.rows[0].id, url, filename }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error saving media info' });
  }
};

export const getMedia = async (req: any, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM media ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching media' });
  }
};

export { upload };
