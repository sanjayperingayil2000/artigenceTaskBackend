import { body, param } from 'express-validator';

export const createPostRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('authorName').trim().notEmpty().withMessage('Author name is required')
];

export const idParamRule = [param('id').isMongoId().withMessage('Invalid post id')];
