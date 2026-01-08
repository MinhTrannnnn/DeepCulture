import 'reflect-metadata'; // QUAN TRỌNG: Phải import đầu tiên cho TypeORM
import dotenv from 'dotenv';
dotenv.config(); // Load biến môi trường từ file .env

import express from 'express';
import { connectDB } from './infra/database/postgres';
import { UserRepositoryImpl } from './data/repositories/UserRepositoryImpl';
import { LoginUser } from './domain/usecases/LoginUser';
import { AuthController } from './api/controllers/AuthController';
import { createAuthRoutes } from './api/routes/authRoutes';

const app = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserRepositoryImpl();
const loginUseCase = new LoginUser(userRepository);
const authController = new AuthController(loginUseCase);

// Routes
app.use('/api/auth', createAuthRoutes(authController));

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});