import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImpl';
import { RefreshTokenRepositoryImpl } from '../../../data/repositories/RefreshTokenRepositoryImpl';
import { LoginUser } from '../../../domain/usecases/auth/LoginUser';
import { RegisterUser } from '../../../domain/usecases/auth/RegisterUser';
import { RefreshToken } from '../../../domain/usecases/auth/RefreshToken';
import { AuthController } from '../../../api/controllers/AuthController';
import { BcryptPasswordHasher } from '../../../infra/ExternalServices/security/PasswordHasherRepositoryImpl';
import { JwtServiceImpl } from '../../../infra/ExternalServices/security/JwtServiceImpl';

export class AuthModule {
    private static userRepository = new UserRepositoryImpl();
    private static refreshTokenRepository = new RefreshTokenRepositoryImpl();
    private static passwordHasher = new BcryptPasswordHasher();
    private static jwtService = new JwtServiceImpl();

    private static loginUseCase = new LoginUser(
        this.userRepository, 
        this.passwordHasher, 
        this.jwtService,
        this.refreshTokenRepository
    );
    private static registerUseCase = new RegisterUser(this.userRepository, this.passwordHasher);
    private static refreshTokenUseCase = new RefreshToken(
        this.userRepository, 
        this.jwtService,
        this.refreshTokenRepository
    );

    public static controller = new AuthController(
        this.loginUseCase,
        this.registerUseCase,
        this.refreshTokenUseCase
    );
}
