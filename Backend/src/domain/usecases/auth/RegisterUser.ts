import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    role?: string;
}

export class RegisterUser {
    constructor(private repository: UserRepository) { }

    async execute(data: RegisterUserDTO): Promise<User> {
        // Validation
        if (!data.username || !data.email || !data.password) {
            throw new Error('Username, email, and password are required');
        }

        // Check if user already exists
        const existingUser = await this.repository.findByUsername(data.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const existingEmail = await this.repository.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        // Create user
        return await this.repository.create({
            username: data.username,
            email: data.email,
            password: data.password, // TODO: Hash password in production!
            role: data.role || 'user'
        });
    }
}
