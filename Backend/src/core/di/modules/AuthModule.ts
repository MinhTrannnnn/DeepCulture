import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImpl';
import { LoginUser } from '../../../domain/usecases/auth/LoginUser';
import { RegisterUser } from '../../../domain/usecases/auth/RegisterUser';
import { AuthController } from '../../../api/controllers/AuthController';

export class AuthModule {
    private static repository = new UserRepositoryImpl();

    private static loginUseCase = new LoginUser(this.repository);
    private static registerUseCase = new RegisterUser(this.repository);

    public static controller = new AuthController(
        this.loginUseCase,
        this.registerUseCase
    );
}
