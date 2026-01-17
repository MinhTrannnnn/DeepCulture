import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

export const createAuthRoutes = (authController: AuthController) => {
    const router = Router();

    router.post('/login', (req, res) => authController.login(req, res));
    router.post('/register', (req, res) => authController.register(req, res));
    router.post('/refresh', (req, res) => authController.refreshToken(req, res));

    return router;
};