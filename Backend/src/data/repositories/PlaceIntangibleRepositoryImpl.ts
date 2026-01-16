import { AppDataSource } from '../../infra/database/postgres';
import { PlaceIntangibleModel } from '../models/PlaceIntangibleModel';
import { PlaceIntangible } from '../../domain/entities/PlaceIntangible';
import { PlaceIntangibleRepository } from '../../domain/repositories/PlaceIntangibleRepository';

export class PlaceIntangibleRepositoryImpl implements PlaceIntangibleRepository {
    private repository = AppDataSource.getRepository(PlaceIntangibleModel);

    async create(data: Omit<PlaceIntangible, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceIntangible> {
        const model = this.repository.create({
            place_id: data.placeId,
            intangible_heritage_id: data.intangibleHeritageId
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<PlaceIntangible | null> {
        const model = await this.repository.findOne({ where: { id }, relations: ['place', 'intangibleHeritage'] });
        return model ? this.toEntity(model) : null;
    }

    async findByPlace(placeId: string): Promise<PlaceIntangible[]> {
        const models = await this.repository.find({ where: { place_id: placeId }, relations: ['intangibleHeritage'] });
        return models.map(m => this.toEntity(m));
    }

    async findByIntangibleHeritage(intangibleHeritageId: string): Promise<PlaceIntangible[]> {
        const models = await this.repository.find({ where: { intangible_heritage_id: intangibleHeritageId }, relations: ['place'] });
        return models.map(m => this.toEntity(m));
    }

    async findByPlaceAndIntangibleHeritage(placeId: string, intangibleHeritageId: string): Promise<PlaceIntangible | null> {
        const model = await this.repository.findOne({ where: { place_id: placeId, intangible_heritage_id: intangibleHeritageId } });
        return model ? this.toEntity(model) : null;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByPlaceAndIntangibleHeritage(placeId: string, intangibleHeritageId: string): Promise<void> {
        await this.repository.delete({ place_id: placeId, intangible_heritage_id: intangibleHeritageId });
    }

    private toEntity(model: PlaceIntangibleModel): PlaceIntangible {
        return {
            id: model.id,
            placeId: model.place_id,
            intangibleHeritageId: model.intangible_heritage_id,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
