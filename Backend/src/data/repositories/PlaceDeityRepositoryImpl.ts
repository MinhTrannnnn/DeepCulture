import { AppDataSource } from '../../infra/database/postgres';
import { PlaceDeityModel } from '../models/PlaceDeityModel';
import { PlaceDeity } from '../../domain/entities/PlaceDeity';
import { PlaceDeityRepository } from '../../domain/repositories/PlaceDeityRepository';

export class PlaceDeityRepositoryImpl implements PlaceDeityRepository {
    private repository = AppDataSource.getRepository(PlaceDeityModel);

    async create(placeDeity: PlaceDeity): Promise<PlaceDeity> {
        const model = this.repository.create({
            place_id: placeDeity.placeId,
            deity_id: placeDeity.deityId,
            worship_type: placeDeity.worshipType,
            significance_level: placeDeity.significanceLevel,
            notes: placeDeity.notes
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<PlaceDeity | null> {
        const model = await this.repository.findOne({
            where: { id },
            relations: ['place', 'deity']
        });
        return model ? this.toEntity(model) : null;
    }

    async findByPlace(placeId: number): Promise<PlaceDeity[]> {
        const models = await this.repository.find({
            where: { place_id: placeId },
            relations: ['deity']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByDeity(deityId: number): Promise<PlaceDeity[]> {
        const models = await this.repository.find({
            where: { deity_id: deityId },
            relations: ['place']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByPlaceAndDeity(placeId: number, deityId: number): Promise<PlaceDeity | null> {
        const model = await this.repository.findOne({
            where: { place_id: placeId, deity_id: deityId }
        });
        return model ? this.toEntity(model) : null;
    }

    async update(id: number, data: Partial<PlaceDeity>): Promise<PlaceDeity> {
        await this.repository.update(id, {
            worship_type: data.worshipType,
            significance_level: data.significanceLevel,
            notes: data.notes
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByPlaceAndDeity(placeId: number, deityId: number): Promise<void> {
        await this.repository.delete({ place_id: placeId, deity_id: deityId });
    }

    private toEntity(model: PlaceDeityModel): PlaceDeity {
        return {
            id: model.id,
            placeId: model.place_id,
            deityId: model.deity_id,
            worshipType: model.worship_type,
            significanceLevel: model.significance_level,
            notes: model.notes,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
