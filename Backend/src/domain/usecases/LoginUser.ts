import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginOutput {
    user: User;
}

export class LoginUser {
    constructor(private userRepository: UserRepository) { }
    async execute(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.findByUsername(input.username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        if (user.password !== input.password) {
            throw new Error('Invalid username or password');
        }
        return {
            user
        };
    }
}