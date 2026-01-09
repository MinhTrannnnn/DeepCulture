import { Request, Response } from 'express';
import { LoginUser } from '../../domain/usecases/auth/LoginUser';
import { RegisterUser } from '../../domain/usecases/auth/RegisterUser';

export class AuthController {
    constructor(
        private loginUseCase: LoginUser,
        private registerUseCase: RegisterUser
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    error: 'Username and password are required'
                });
            }

            const result = await this.loginUseCase.execute({ username, password });

            return res.json({
                message: 'Login successful',
                user: {
                    id: result.user.id,
                    username: result.user.username,
                    email: result.user.email
                }
            });
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const user = await this.registerUseCase.execute(req.body);

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}