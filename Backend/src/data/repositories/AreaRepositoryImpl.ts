import { AppDataSource } from '../../infra/database/postgres';
import { AreaModel } from '../models/AreaModel';
import { Area } from '../../domain/entities/Area';
import { AreaRepository } from '../../domain/repositories/AreaRepository';

export class AreaRepositoryImpl implements AreaRepository {
    private repository = AppDataSource.getRepository(AreaModel);

    async create(area: Area): Promise<Area> {
        const model = this.repository.create({
            name: area.name,
            place_id: area.placeId,
            area_type: area.areaType,
            description: area.description
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<Area | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Area[]> {
        const models = await this.repository.find();
        return models.map(m => this.toEntity(m));
    }

    async findByPlace(placeId: number): Promise<Area[]> {
        const models = await this.repository.find({
            where: { place_id: placeId }
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: number, data: Partial<Area>): Promise<Area> {
        await this.repository.update(id, {
            name: data.name,
            place_id: data.placeId,
            area_type: data.areaType,
            description: data.description
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: AreaModel): Area {
        return {
            id: model.id,
            name: model.name,
            placeId: model.place_id,
            areaType: model.area_type,
            description: model.description,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
