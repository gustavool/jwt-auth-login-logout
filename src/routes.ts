import { Router } from 'express';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/user', userController.create);
router.post('/auth', authController.auth);

export default router;
