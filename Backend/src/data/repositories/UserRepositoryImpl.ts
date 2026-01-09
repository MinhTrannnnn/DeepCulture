import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../models/UserModel';
import { AppDataSource } from '../../infra/database/postgres';

export class UserRepositoryImpl implements UserRepository {
    private repository = AppDataSource.getRepository(UserModel);

    async findByUsername(username: string): Promise<User | null> {
        const userModel = await this.repository.findOne({ where: { username } });

        if (!userModel) return null;

        return {
            id: userModel.id,
            username: userModel.username,
            email: userModel.email,
            password: userModel.password
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        const userModel = await this.repository.findOne({ where: { email } });

        if (!userModel) return null;

        return {
            id: userModel.id,
            username: userModel.username,
            email: userModel.email,
            password: userModel.password
        };
    }

    async create(user: User): Promise<User> {
        const userModel = this.repository.create({
            username: user.username,
            email: user.email,
            password: user.password
        });

        const savedUser = await this.repository.save(userModel);

        return {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            password: savedUser.password
        };
    }
}