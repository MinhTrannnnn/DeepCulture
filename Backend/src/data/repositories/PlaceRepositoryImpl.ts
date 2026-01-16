import { AppDataSource } from '../../infra/database/postgres';
import { PlaceModel } from '../models/PlaceModel';
import { Place } from '../../domain/entities/Place';
import { PlaceRepository } from '../../domain/repositories/PlaceRepository';

export class PlaceRepositoryImpl implements PlaceRepository {
    private repository = AppDataSource.getRepository(PlaceModel);

    async create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> {
        const model = this.repository.create({
            name: place.name,
            common_name: place.commonName,
            type: place.type,
            address: place.address,
            longitude: place.longitude,
            latitude: place.latitude,
            established_year: place.establishedYear,
            land_area: place.landArea,
            status: place.status,
            description: place.description,
            history: place.history,
            administrative_unit_id: place.administrativeUnitId
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<Place | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Place[]> {
        const models = await this.repository.find();
        return models.map(m => this.toEntity(m));
    }

    async findByAdministrativeUnit(administrativeUnitId: string): Promise<Place[]> {
        const models = await this.repository.find({
            where: { administrative_unit_id: administrativeUnitId }
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<Place>): Promise<Place> {
        await this.repository.update(id, {
            name: data.name,
            common_name: data.commonName,
            type: data.type,
            address: data.address,
            longitude: data.longitude,
            latitude: data.latitude,
            established_year: data.establishedYear,
            land_area: data.landArea,
            status: data.status,
            description: data.description,
            history: data.history,
            administrative_unit_id: data.administrativeUnitId
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: PlaceModel): Place {
        return {
            id: model.id,
            name: model.name,
            commonName: model.common_name,
            type: model.type,
            address: model.address,
            longitude: model.longitude ? Number(model.longitude) : undefined,
            latitude: model.latitude ? Number(model.latitude) : undefined,
            establishedYear: model.established_year,
            landArea: model.land_area,
            status: model.status,
            description: model.description,
            history: model.history,
            administrativeUnitId: model.administrative_unit_id,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
