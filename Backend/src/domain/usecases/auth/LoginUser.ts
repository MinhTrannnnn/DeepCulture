import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { PasswordHasher } from "../../repositories/PasswordHasherRepository";
import { JwtService } from "../../repositories/JwtService";
import { RefreshTokenRepository } from "../../repositories/RefreshTokenRepository";

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginOutput {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export class LoginUser {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private jwtService: JwtService,
        private refreshTokenRepository: RefreshTokenRepository
    ) { }
    
    async execute(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.findByUsername(input.username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        
        const isPasswordValid = await this.passwordHasher.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        
        const accessToken = this.jwtService.signAccessToken({
            sub: user.id.toString(),
            role: user.role || 'VIEWER'
        });

        const refreshToken = this.jwtService.signRefreshToken({
            sub: user.id.toString()
        });

        // Save refresh token to database with 7 days expiry
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.refreshTokenRepository.save({
            userId: user.id.toString(),
            refreshToken,
            isRevoked: false,
            revokedAt: null,
            expiresAt
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }
}
