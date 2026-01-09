import { AppDataSource } from '../../infra/database/postgres';
import { AdministrativeUnitModel } from '../models/AdministrativeUnitModel';
import { AdministrativeUnit } from '../../domain/entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../domain/repositories/AdministrativeUnitRepository';

export class AdministrativeUnitRepositoryImpl implements AdministrativeUnitRepository {
    private repository = AppDataSource.getRepository(AdministrativeUnitModel);

    async create(unit: AdministrativeUnit): Promise<AdministrativeUnit> {
        const model = this.repository.create({
            name: unit.name,
            level: unit.level
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<AdministrativeUnit | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(level?: string): Promise<AdministrativeUnit[]> {
        const query = level
            ? { where: { level } }
            : {};
        const models = await this.repository.find(query);
        return models.map(m => this.toEntity(m));
    }

    async update(id: number, data: Partial<AdministrativeUnit>): Promise<AdministrativeUnit> {
        await this.repository.update(id, {
            name: data.name,
            level: data.level
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: AdministrativeUnitModel): AdministrativeUnit {
        return {
            id: model.id,
            name: model.name,
            level: model.level,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}