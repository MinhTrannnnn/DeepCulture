import jwt from 'jsonwebtoken';
import { JwtService } from '../../../domain/repositories/JwtService';

export class JwtServiceImpl implements JwtService {
  signAccessToken(payload: { sub: string; role: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' });
  }

  signRefreshToken(payload: { sub: string }): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
  }
}
