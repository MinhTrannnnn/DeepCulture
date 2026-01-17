import { UserRepository } from '../../repositories/UserRepository';
import { JwtService } from '../../repositories/JwtService';
import { RefreshTokenRepository } from '../../repositories/RefreshTokenRepository';

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface RefreshTokenOutput {
  accessToken: string;
  refreshToken: string;
}

export class RefreshToken {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    try {
      // Check if token exists in database
      const session = await this.refreshTokenRepository.findByToken(input.refreshToken);
      if (!session) {
        throw new Error('Token not found in database');
      }

      // Check if token is revoked
      if (session.isRevoked) {
        throw new Error('Token has been revoked');
      }

      // Check if token has expired
      if (new Date() > session.expiresAt) {
        throw new Error('Token has expired');
      }

      // Verify JWT signature
      const payload = this.jwtService.verifyRefreshToken(input.refreshToken);

      // Get user to verify it still exists
      const user = await this.userRepository.findById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }

      // Generate new access token
      const accessToken = this.jwtService.signAccessToken({
        sub: user.id.toString(),
        role: user.role || 'VIEWER'
      });

      // Generate new refresh token
      const newRefreshToken = this.jwtService.signRefreshToken({
        sub: user.id.toString()
      });

      // Save new token and revoke old one
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await this.refreshTokenRepository.revoke(session.id);
      await this.refreshTokenRepository.save({
        userId: session.userId,
        refreshToken: newRefreshToken,
        isRevoked: false,
        revokedAt: null,
        expiresAt
      });

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    } catch (error: any) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
