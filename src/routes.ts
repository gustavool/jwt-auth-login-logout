import { Router } from 'express';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/users', userController.create);
router.get('/users/:id', authMiddleware, userController.findById);
router.get('/users', authMiddleware, userController.findAll);
router.post('/users/login', authController.login);
router.post('/users/logout', authMiddleware, authController.logout);

export default router;
