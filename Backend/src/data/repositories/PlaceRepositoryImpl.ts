import { AppDataSource } from '../../infra/database/postgres';
import { PlaceModel } from '../models/PlaceModel';
import { Place } from '../../domain/entities/Place';
import { PlaceRepository } from '../../domain/repositories/PlaceRepository';

export class PlaceRepositoryImpl implements PlaceRepository {
    private repository = AppDataSource.getRepository(PlaceModel);

    async create(place: Place): Promise<Place> {
        const model = this.repository.create({
            name: place.name,
            address: place.address,
            administrative_unit_id: place.administrativeUnitId,
            latitude: place.latitude,
            longitude: place.longitude,
            description: place.description,
            historical_significance: place.historicalSignificance,
            visiting_hours: place.visitingHours,
            entry_fee: place.entryFee,
            contact_info: place.contactInfo
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: number): Promise<Place | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Place[]> {
        const models = await this.repository.find();
        return models.map(m => this.toEntity(m));
    }

    async findByAdministrativeUnit(administrativeUnitId: number): Promise<Place[]> {
        const models = await this.repository.find({
            where: { administrative_unit_id: administrativeUnitId }
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: number, data: Partial<Place>): Promise<Place> {
        await this.repository.update(id, {
            name: data.name,
            address: data.address,
            administrative_unit_id: data.administrativeUnitId,
            latitude: data.latitude,
            longitude: data.longitude,
            description: data.description,
            historical_significance: data.historicalSignificance,
            visiting_hours: data.visitingHours,
            entry_fee: data.entryFee,
            contact_info: data.contactInfo
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: PlaceModel): Place {
        return {
            id: model.id,
            name: model.name,
            address: model.address,
            administrativeUnitId: model.administrative_unit_id,
            latitude: Number(model.latitude),
            longitude: Number(model.longitude),
            description: model.description,
            historicalSignificance: model.historical_significance,
            visitingHours: model.visiting_hours,
            entryFee: Number(model.entry_fee),
            contactInfo: model.contact_info,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
