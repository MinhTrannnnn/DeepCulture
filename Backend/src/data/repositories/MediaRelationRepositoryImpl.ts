import { AppDataSource } from '../../infra/database/postgres';
import { MediaRelationModel } from '../models/MediaRelationModel';
import { MediaRelation } from '../../domain/entities/MediaRelation';
import { MediaRelationRepository } from '../../domain/repositories/MediaRelationRepository';

export class MediaRelationRepositoryImpl implements MediaRelationRepository {
    private repository = AppDataSource.getRepository(MediaRelationModel);

    async create(relation: Omit<MediaRelation, 'id' | 'createdAt'>): Promise<MediaRelation> {
        const model = this.repository.create({
            media_id: relation.mediaId,
            entity_type: relation.entityType,
            entity_id: relation.entityId,
            role: relation.role,
            order_index: relation.orderIndex || 0
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<MediaRelation | null> {
        const model = await this.repository.findOne({ where: { id }, relations: ['media'] });
        return model ? this.toEntity(model) : null;
    }

    async findByMedia(mediaId: string): Promise<MediaRelation[]> {
        const models = await this.repository.find({ where: { media_id: mediaId } });
        return models.map(m => this.toEntity(m));
    }

    async findByEntity(entityType: string, entityId: string): Promise<MediaRelation[]> {
        const models = await this.repository.find({
            where: { entity_type: entityType, entity_id: entityId },
            relations: ['media'],
            order: { order_index: 'ASC' }
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<MediaRelation>): Promise<MediaRelation> {
        await this.repository.update(id, {
            role: data.role,
            order_index: data.orderIndex
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('MediaRelation not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByMedia(mediaId: string): Promise<void> {
        await this.repository.delete({ media_id: mediaId });
    }

    private toEntity(model: MediaRelationModel): MediaRelation {
        return {
            id: model.id,
            mediaId: model.media_id,
            entityType: model.entity_type,
            entityId: model.entity_id,
            role: model.role,
            orderIndex: model.order_index,
            createdAt: model.created_at
        };
    }
}
