import { body } from 'express-validator';

export const signupRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length is 6')
];

export const loginRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];
