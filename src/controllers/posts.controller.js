import { validationResult } from 'express-validator';
import Post from '../models/Post.js';

// GET /api/posts
export async function getPosts(_req, res) {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
}

// GET /api/posts/:id
export async function getPostById(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
}

// POST /api/posts  (protected)
export async function createPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, content, authorName } = req.body;
  const post = await Post.create({
    title,
    content,
    authorName,
    user: req.user?._id
  });
  res.status(201).json(post);
}

// PUT /api/posts/:id  (protected; author or any logged-in user for simplicity)
export async function updatePost(req, res) {
  const { id } = req.params;
  const updates = {};
  ['title', 'content', 'authorName'].forEach((k) => {
    if (req.body[k] !== undefined) updates[k] = req.body[k];
  });

  const post = await Post.findByIdAndUpdate(id, updates, { new: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });

  res.json(post);
}

// DELETE /api/posts/:id  (protected)
export async function deletePost(req, res) {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
}
