import { AppDataSource } from '../../infra/database/postgres';
import { ArchitectureModel } from '../models/ArchitectureModel';
import { Architecture } from '../../domain/entities/Architecture';
import { ArchitectureRepository } from '../../domain/repositories/ArchitectureRepository';

export class ArchitectureRepositoryImpl implements ArchitectureRepository {
    private repository = AppDataSource.getRepository(ArchitectureModel);

    async create(architecture: Omit<Architecture, 'id' | 'createdAt' | 'updatedAt'>): Promise<Architecture> {
        const model = this.repository.create({
            name: architecture.name,
            type: architecture.type,
            material: architecture.material,
            technique: architecture.technique,
            pattern: architecture.pattern,
            description: architecture.description,
            year: architecture.year
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<Architecture | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Architecture[]> {
        const models = await this.repository.find({ order: { name: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByType(type: string): Promise<Architecture[]> {
        const models = await this.repository.find({ where: { type } });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<Architecture>): Promise<Architecture> {
        await this.repository.update(id, {
            name: data.name,
            type: data.type,
            material: data.material,
            technique: data.technique,
            pattern: data.pattern,
            description: data.description,
            year: data.year
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Architecture not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: ArchitectureModel): Architecture {
        return {
            id: model.id,
            name: model.name,
            type: model.type,
            material: model.material,
            technique: model.technique,
            pattern: model.pattern,
            description: model.description,
            year: model.year,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
