import { Request, Response } from 'express';
import db from '../config/db.js';
import { AuthRequest } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

export const createPost = async (req: any, res: Response) => {
  const { title, content, status, category_id } = req.body;
  const author_id = req.user?.id;

  if (!title || !author_id) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const slug = slugify(title);

  try {
    const result = await db.query(
      'INSERT INTO posts (author_id, title, slug, content, status, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [author_id, title, slug, content, status || 'draft', category_id]
    );
    res.status(201).json({ message: 'Post created successfully', postId: result.rows[0].id });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Post with this title already exists' });
    }
    return res.status(500).json({ message: 'Error creating post' });
  }
};

export const getPosts = async (req: any, res: Response) => {
  const { status } = req.query;
  let query = 'SELECT posts.*, users.username as author_name FROM posts JOIN users ON posts.author_id = users.id';
  const params: any[] = [];

  if (status) {
    query += ' WHERE posts.status = $1';
    params.push(status);
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const getPostBySlug = async (req: any, res: Response) => {
  const { slug } = req.params;

  try {
    const result = await db.query('SELECT * FROM posts WHERE slug = $1', [slug]);
    const post = result.rows[0];
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

export const updatePost = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title, content, status, category_id } = req.body;

  try {
    const result = await db.query(
      'UPDATE posts SET title = $1, content = $2, status = $3, category_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5',
      [title, content, status, category_id, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

export const deletePost = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM posts WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};
