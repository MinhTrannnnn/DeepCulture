import { AppDataSource } from '../../infra/database/postgres';
import { PlaceDeityModel } from '../models/PlaceDeityModel';
import { PlaceDeity } from '../../domain/entities/PlaceDeity';
import { PlaceDeityRepository } from '../../domain/repositories/PlaceDeityRepository';

export class PlaceDeityRepositoryImpl implements PlaceDeityRepository {
    private repository = AppDataSource.getRepository(PlaceDeityModel);

    async create(placeDeity: Omit<PlaceDeity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceDeity> {
        const model = this.repository.create({
            place_id: placeDeity.placeId,
            deity_id: placeDeity.deityId,
            role: placeDeity.role,
            worship_type: placeDeity.worshipType,
            significance_level: placeDeity.significanceLevel,
            notes: placeDeity.notes
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<PlaceDeity | null> {
        const model = await this.repository.findOne({
            where: { id },
            relations: ['place', 'deity']
        });
        return model ? this.toEntity(model) : null;
    }

    async findByPlace(placeId: string): Promise<PlaceDeity[]> {
        const models = await this.repository.find({
            where: { place_id: placeId },
            relations: ['deity']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByDeity(deityId: string): Promise<PlaceDeity[]> {
        const models = await this.repository.find({
            where: { deity_id: deityId },
            relations: ['place']
        });
        return models.map(m => this.toEntity(m));
    }

    async findByPlaceAndDeity(placeId: string, deityId: string): Promise<PlaceDeity | null> {
        const model = await this.repository.findOne({
            where: { place_id: placeId, deity_id: deityId }
        });
        return model ? this.toEntity(model) : null;
    }

    async update(id: string, data: Partial<PlaceDeity>): Promise<PlaceDeity> {
        await this.repository.update(id, {
            role: data.role,
            worship_type: data.worshipType,
            significance_level: data.significanceLevel,
            notes: data.notes
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByPlaceAndDeity(placeId: string, deityId: string): Promise<void> {
        await this.repository.delete({ place_id: placeId, deity_id: deityId });
    }

    private toEntity(model: PlaceDeityModel): PlaceDeity {
        return {
            id: model.id,
            placeId: model.place_id,
            deityId: model.deity_id,
            role: model.role,
            worshipType: model.worship_type,
            significanceLevel: model.significance_level,
            notes: model.notes,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
