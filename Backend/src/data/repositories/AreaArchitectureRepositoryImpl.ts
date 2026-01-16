import { AppDataSource } from '../../infra/database/postgres';
import { AreaArchitectureModel } from '../models/AreaArchitectureModel';
import { AreaArchitecture } from '../../domain/entities/AreaArchitecture';
import { AreaArchitectureRepository } from '../../domain/repositories/AreaArchitectureRepository';

export class AreaArchitectureRepositoryImpl implements AreaArchitectureRepository {
    private repository = AppDataSource.getRepository(AreaArchitectureModel);

    async create(data: Omit<AreaArchitecture, 'id' | 'createdAt' | 'updatedAt'>): Promise<AreaArchitecture> {
        const model = this.repository.create({
            area_id: data.areaId,
            architecture_id: data.architectureId,
            position: data.position
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<AreaArchitecture | null> {
        const model = await this.repository.findOne({ where: { id }, relations: ['area', 'architecture'] });
        return model ? this.toEntity(model) : null;
    }

    async findByArea(areaId: string): Promise<AreaArchitecture[]> {
        const models = await this.repository.find({ where: { area_id: areaId }, relations: ['architecture'] });
        return models.map(m => this.toEntity(m));
    }

    async findByArchitecture(architectureId: string): Promise<AreaArchitecture[]> {
        const models = await this.repository.find({ where: { architecture_id: architectureId }, relations: ['area'] });
        return models.map(m => this.toEntity(m));
    }

    async findByAreaAndArchitecture(areaId: string, architectureId: string): Promise<AreaArchitecture | null> {
        const model = await this.repository.findOne({ where: { area_id: areaId, architecture_id: architectureId } });
        return model ? this.toEntity(model) : null;
    }

    async update(id: string, data: Partial<AreaArchitecture>): Promise<AreaArchitecture> {
        await this.repository.update(id, { position: data.position });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('AreaArchitecture not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByAreaAndArchitecture(areaId: string, architectureId: string): Promise<void> {
        await this.repository.delete({ area_id: areaId, architecture_id: architectureId });
    }

    private toEntity(model: AreaArchitectureModel): AreaArchitecture {
        return {
            id: model.id,
            areaId: model.area_id,
            architectureId: model.architecture_id,
            position: model.position,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
