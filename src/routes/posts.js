import { Router } from 'express';
import protect from '../middleware/auth.js';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost
} from '../controllers/posts.controller.js';
import { createPostRules, idParamRule } from '../validators/posts.validators.js';
import { validationResult } from 'express-validator';

const router = Router();

function runValidators(rules) {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    }
  ];
}

router.get('/', getPosts);
router.get('/:id', runValidators(idParamRule), getPostById);
router.post('/', protect, runValidators(createPostRules), createPost);
router.put('/:id', protect, runValidators(idParamRule), updatePost);
router.delete('/:id', protect, runValidators(idParamRule), deletePost);

export default router;
