import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../models/UserModel';
import { AppDataSource } from '../../infra/database/postgres';

export class UserRepositoryImpl implements UserRepository {
    private repository = AppDataSource.getRepository(UserModel);

    async findById(id: string): Promise<User | null> {
        const userModel = await this.repository.findOne({ where: { id } });
        return userModel ? this.toEntity(userModel) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const userModel = await this.repository.findOne({ where: { username } });
        return userModel ? this.toEntity(userModel) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userModel = await this.repository.findOne({ where: { email } });
        return userModel ? this.toEntity(userModel) : null;
    }

    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const userModel = this.repository.create({
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        });
        const savedUser = await this.repository.save(userModel);
        return this.toEntity(savedUser);
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        await this.repository.update(id, {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('User not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: UserModel): User {
        return {
            id: model.id,
            username: model.username,
            email: model.email,
            password: model.password,
            role: model.role,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}