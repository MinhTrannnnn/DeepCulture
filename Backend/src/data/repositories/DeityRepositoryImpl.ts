import { AppDataSource } from '../../infra/database/postgres';
import { DeityModel } from '../models/DeityModel';
import { Deity } from '../../domain/entities/Deity';
import { DeityRepository } from '../../domain/repositories/DeityRepository';

export class DeityRepositoryImpl implements DeityRepository {
    private repository = AppDataSource.getRepository(DeityModel);

    async create(deity: Deity): Promise<Deity> {
        const model = this.repository.create({
            name: deity.name,
            type: deity.type,
            origin: deity.origin,
            legend: deity.legend
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<Deity | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Deity[]> {
        const models = await this.repository.find();
        return models.map(m => this.toEntity(m));
    }

    async update(id: number, data: Partial<Deity>): Promise<Deity> {
        await this.repository.update(id, {
            name: data.name,
            type: data.type,
            origin: data.origin,
            legend: data.legend
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: DeityModel): Deity {
        return {
            id: model.id,
            name: model.name,
            type: model.type,
            origin: model.origin,
            legend: model.legend,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
