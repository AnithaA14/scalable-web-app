import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateCreateTask } from '../validators/taskValidator.js';
import { handleValidationErrors } from '../middleware/validateRequest.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/', protect, validateCreateTask, handleValidationErrors, taskController.createTask);
router.get('/', protect, taskController.getTasks);
router.get('/stats/overview', protect, taskController.getTaskStats);
router.get('/:id', protect, taskController.getTaskById);
router.patch('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);
export default router;