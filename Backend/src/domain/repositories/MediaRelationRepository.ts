import { MediaRelation } from '../entities/MediaRelation';

export interface MediaRelationRepository {
    create(relation: Omit<MediaRelation, 'id' | 'createdAt'>): Promise<MediaRelation>;
    findById(id: string): Promise<MediaRelation | null>;
    findByMedia(mediaId: string): Promise<MediaRelation[]>;
    findByEntity(entityType: string, entityId: string): Promise<MediaRelation[]>;
    update(id: string, data: Partial<MediaRelation>): Promise<MediaRelation>;
    delete(id: string): Promise<void>;
    deleteByMedia(mediaId: string): Promise<void>;
}
