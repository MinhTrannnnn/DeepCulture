import { AppDataSource } from '../../infra/database/postgres';
import { IntangibleHeritageModel } from '../models/IntangibleHeritageModel';
import { IntangibleHeritage } from '../../domain/entities/IntangibleHeritage';
import { IntangibleHeritageRepository } from '../../domain/repositories/IntangibleHeritageRepository';
import { ILike } from 'typeorm';

export class IntangibleHeritageRepositoryImpl implements IntangibleHeritageRepository {
    private repository = AppDataSource.getRepository(IntangibleHeritageModel);

    async create(heritage: Omit<IntangibleHeritage, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntangibleHeritage> {
        const model = this.repository.create({
            name: heritage.name,
            type: heritage.type,
            origin: heritage.origin,
            description: heritage.description,
            significance: heritage.significance,
            community: heritage.community,
            region: heritage.region
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<IntangibleHeritage | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<IntangibleHeritage[]> {
        const models = await this.repository.find({ order: { name: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByName(name: string): Promise<IntangibleHeritage[]> {
        const models = await this.repository.find({
            where: { name: ILike(`%${name}%`) }
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<IntangibleHeritage>): Promise<IntangibleHeritage> {
        await this.repository.update(id, {
            name: data.name,
            type: data.type,
            origin: data.origin,
            description: data.description,
            significance: data.significance,
            community: data.community,
            region: data.region
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('IntangibleHeritage not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: IntangibleHeritageModel): IntangibleHeritage {
        return {
            id: model.id,
            name: model.name,
            type: model.type,
            origin: model.origin,
            description: model.description,
            significance: model.significance,
            community: model.community,
            region: model.region,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
