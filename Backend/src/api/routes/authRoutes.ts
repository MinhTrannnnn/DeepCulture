import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AppDataSource } from '../../infra/database/postgres';
import { UserModel } from '../../data/models/UserModel';

export const createAuthRoutes = (authController: AuthController) => {
    const router = Router();

    router.post('/login', (req, res) => authController.login(req, res));

    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const userRepo = AppDataSource.getRepository(UserModel);

            const user = userRepo.create({ username, email, password });
            await userRepo.save(user);

            res.status(201).json({ message: 'User created', user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};