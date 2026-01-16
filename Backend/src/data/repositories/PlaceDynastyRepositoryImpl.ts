import { AppDataSource } from '../../infra/database/postgres';
import { PlaceDynastyModel } from '../models/PlaceDynastyModel';
import { PlaceDynasty } from '../../domain/entities/PlaceDynasty';
import { PlaceDynastyRepository } from '../../domain/repositories/PlaceDynastyRepository';

export class PlaceDynastyRepositoryImpl implements PlaceDynastyRepository {
    private repository = AppDataSource.getRepository(PlaceDynastyModel);

    async create(data: Omit<PlaceDynasty, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceDynasty> {
        const model = this.repository.create({
            place_id: data.placeId,
            dynasty_id: data.dynastyId,
            role: data.role,
            note: data.note
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<PlaceDynasty | null> {
        const model = await this.repository.findOne({
            where: { id },
            relations: ['place', 'dynasty']
        });
        return model ? this.toEntity(model) : null;
    }

    async findByPlace(placeId: string): Promise<PlaceDynasty[]> {
        const models = await this.repository.find({
            where: { place_id: placeId },
            relations: ['dynasty']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByDynasty(dynastyId: string): Promise<PlaceDynasty[]> {
        const models = await this.repository.find({
            where: { dynasty_id: dynastyId },
            relations: ['place']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByPlaceAndDynasty(placeId: string, dynastyId: string): Promise<PlaceDynasty | null> {
        const model = await this.repository.findOne({
            where: { place_id: placeId, dynasty_id: dynastyId }
        });
        return model ? this.toEntity(model) : null;
    }

    async update(id: string, data: Partial<PlaceDynasty>): Promise<PlaceDynasty> {
        await this.repository.update(id, {
            role: data.role,
            note: data.note
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('PlaceDynasty not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByPlaceAndDynasty(placeId: string, dynastyId: string): Promise<void> {
        await this.repository.delete({ place_id: placeId, dynasty_id: dynastyId });
    }

    private toEntity(model: PlaceDynastyModel): PlaceDynasty {
        return {
            id: model.id,
            placeId: model.place_id,
            dynastyId: model.dynasty_id,
            role: model.role,
            note: model.note,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
