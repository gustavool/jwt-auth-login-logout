import { Router } from 'express';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/user', userController.create);
router.get('/user/:id', authMiddleware, userController.findById);
router.post('/auth', authController.auth);

export default router;
