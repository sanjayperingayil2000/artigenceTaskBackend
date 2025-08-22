import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  const token = signToken(user);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token
  });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token
  });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
