import { Request, Response } from 'express';
import { LoginUser } from '../../domain/usecases/LoginUser';

export class AuthController {
    constructor(private loginUser: LoginUser) { }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    error: 'Username and password are required'
                });
            }

            const result = await this.loginUser.execute({ username, password });

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
}