import { AppDataSource } from '../../infra/database/postgres';
import { HanNomInscriptionModel } from '../models/HanNomInscriptionModel';
import { HanNomInscription } from '../../domain/entities/HanNomInscription';
import { HanNomInscriptionRepository } from '../../domain/repositories/HanNomInscriptionRepository';

export class HanNomInscriptionRepositoryImpl implements HanNomInscriptionRepository {
    private repository = AppDataSource.getRepository(HanNomInscriptionModel);

    async create(inscription: Omit<HanNomInscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<HanNomInscription> {
        const model = this.repository.create({
            type: inscription.type,
            location: inscription.location,
            transcription: inscription.transcription,
            translation: inscription.translation,
            year: inscription.year,
            condition: inscription.condition,
            area_id: inscription.areaId
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<HanNomInscription | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<HanNomInscription[]> {
        const models = await this.repository.find({ order: { year: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByArea(areaId: string): Promise<HanNomInscription[]> {
        const models = await this.repository.find({ where: { area_id: areaId } });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<HanNomInscription>): Promise<HanNomInscription> {
        await this.repository.update(id, {
            type: data.type,
            location: data.location,
            transcription: data.transcription,
            translation: data.translation,
            year: data.year,
            condition: data.condition,
            area_id: data.areaId
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('HanNomInscription not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: HanNomInscriptionModel): HanNomInscription {
        return {
            id: model.id,
            type: model.type,
            location: model.location,
            transcription: model.transcription,
            translation: model.translation,
            year: model.year,
            condition: model.condition,
            areaId: model.area_id,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
