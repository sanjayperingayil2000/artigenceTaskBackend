import { Router } from 'express';
import { login, me, signup } from '../controllers/auth.controller.js';
import { loginRules, signupRules } from '../validators/auth.validators.js';
import { validationResult } from 'express-validator';
import protect from '../middleware/auth.js';

const router = Router();

// Wrap validators to send uniform errors early
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

router.post('/signup', runValidators(signupRules), signup);
router.post('/login', runValidators(loginRules), login);
router.get('/me', protect, me);

export default router;
