import { User } from '../../entities/User';
import { PasswordHasher } from '../../repositories/PasswordHasherRepository';
import { UserRepository } from '../../repositories/UserRepository';

export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    role?: string;
}

export class RegisterUser {
    constructor(
        private userRepo: UserRepository,
        private passwordHasher: PasswordHasher
    ) {}

    async execute(data: RegisterUserDTO): Promise<User> {
        // Validation
        if (!data.username || !data.email || !data.password) {
            throw new Error('Username, email, and password are required');
        }

        // Check if user already exists
        const existingUser = await this.userRepo.findByUsername(data.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const existingEmail = await this.userRepo.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        // Hash password
        const hashedPassword = await this.passwordHasher.hash(data.password);

        // Create user
        return await this.userRepo.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role || 'VIEWER'
        });
    }
}
