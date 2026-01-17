import { Request, Response } from 'express';
import { LoginUser } from '../../domain/usecases/auth/LoginUser';
import { RegisterUser } from '../../domain/usecases/auth/RegisterUser';
import { RefreshToken } from '../../domain/usecases/auth/RefreshToken';

export class AuthController {
    constructor(
        private loginUseCase: LoginUser,
        private registerUseCase: RegisterUser,
        private refreshTokenUseCase: RefreshToken
    ) { }

    async login(req: Request, res: Response) {
        try {
            if (!req.body) {
                return res.status(400).json({
                    error: 'Request body is missing'
                });
            }

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
                },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            if (!req.body) {
                return res.status(400).json({
                    error: 'Request body is missing'
                });
            }

            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    error: 'Refresh token is required'
                });
            }

            const result = await this.refreshTokenUseCase.execute({ refreshToken });

            return res.json({
                message: 'Token refreshed successfully',
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
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