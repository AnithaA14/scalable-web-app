import { body } from 'express-validator';

export const validateCreateTask = [
  body('title').trim().notEmpty().withMessage('Title required').isLength({ min: 3 })
];

export const validateUpdateTask = [
  body('title').optional().trim().isLength({ min: 3 })
];