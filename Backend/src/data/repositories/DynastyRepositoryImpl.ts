import { AppDataSource } from '../../infra/database/postgres';
import { DynastyModel } from '../models/DynastyModel';
import { Dynasty } from '../../domain/entities/Dynasty';
import { DynastyRepository } from '../../domain/repositories/DynastyRepository';

export class DynastyRepositoryImpl implements DynastyRepository {
    private repository = AppDataSource.getRepository(DynastyModel);

    async create(dynasty: Dynasty): Promise<Dynasty> {
        const model = this.repository.create({
            name: dynasty.name,
            start_year: dynasty.startYear,
            end_year: dynasty.endYear,
            capital: dynasty.capital,
            description: dynasty.description
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<Dynasty | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Dynasty[]> {
        const models = await this.repository.find({ order: { start_year: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByName(name: string): Promise<Dynasty | null> {
        const model = await this.repository.findOne({ where: { name } });
        return model ? this.toEntity(model) : null;
    }

    async update(id: number, data: Partial<Dynasty>): Promise<Dynasty> {
        await this.repository.update(id, {
            name: data.name,
            start_year: data.startYear,
            end_year: data.endYear,
            capital: data.capital,
            description: data.description
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: DynastyModel): Dynasty {
        return {
            id: model.id,
            name: model.name,
            startYear: model.start_year,
            endYear: model.end_year,
            capital: model.capital,
            description: model.description,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
