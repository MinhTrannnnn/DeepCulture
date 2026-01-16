import { AppDataSource } from '../../infra/database/postgres';
import { ArtifactModel } from '../models/ArtifactModel';
import { Artifact } from '../../domain/entities/Artifact';
import { ArtifactRepository } from '../../domain/repositories/ArtifactRepository';

export class ArtifactRepositoryImpl implements ArtifactRepository {
    private repository = AppDataSource.getRepository(ArtifactModel);

    async create(artifact: Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Artifact> {
        const model = this.repository.create({
            name: artifact.name,
            type: artifact.type,
            weight: artifact.weight,
            year: artifact.year,
            origin: artifact.origin,
            condition: artifact.condition,
            description: artifact.description,
            symbolism: artifact.symbolism,
            area_id: artifact.areaId
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<Artifact | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Artifact[]> {
        const models = await this.repository.find({ order: { name: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByArea(areaId: string): Promise<Artifact[]> {
        const models = await this.repository.find({ where: { area_id: areaId } });
        return models.map(m => this.toEntity(m));
    }

    async findByType(type: string): Promise<Artifact[]> {
        const models = await this.repository.find({ where: { type } });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<Artifact>): Promise<Artifact> {
        await this.repository.update(id, {
            name: data.name,
            type: data.type,
            weight: data.weight,
            year: data.year,
            origin: data.origin,
            condition: data.condition,
            description: data.description,
            symbolism: data.symbolism,
            area_id: data.areaId
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Artifact not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: ArtifactModel): Artifact {
        return {
            id: model.id,
            name: model.name,
            type: model.type,
            weight: model.weight,
            year: model.year,
            origin: model.origin,
            condition: model.condition,
            description: model.description,
            symbolism: model.symbolism,
            areaId: model.area_id,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
