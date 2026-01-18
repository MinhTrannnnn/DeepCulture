import { MediaRelation } from '../../entities/MediaRelation';
import { MediaRelationRepository } from '../../repositories/MediaRelationRepository';

export interface LinkMediaToEntityDTO {
    mediaId: string;
    entityType: string;
    entityId: string;
    role?: string;
    orderIndex?: number;
}

export class LinkMediaToEntity {
    constructor(private repository: MediaRelationRepository) { }

    async execute(data: LinkMediaToEntityDTO): Promise<MediaRelation> {
        return await this.repository.create({
            mediaId: data.mediaId,
            entityType: data.entityType,
            entityId: data.entityId,
            role: data.role,
            orderIndex: data.orderIndex
        });
    }
}
