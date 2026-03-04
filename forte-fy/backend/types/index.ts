export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  created_at: string;
}

export interface Post {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  category_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
  uploaded_by: number;
  created_at: string;
}
