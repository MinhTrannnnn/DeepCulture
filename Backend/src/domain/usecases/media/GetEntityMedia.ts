import { Media } from '../../entities/Media';
import { MediaRelation } from '../../entities/MediaRelation';
import { MediaRepository } from '../../repositories/MediaRepository';
import { MediaRelationRepository } from '../../repositories/MediaRelationRepository';

export interface MediaWithRelation extends MediaRelation {
    media?: Media;
}

export class GetEntityMedia {
    constructor(
        private mediaRepository: MediaRepository,
        private mediaRelationRepository: MediaRelationRepository
    ) { }

    async execute(entityType: string, entityId: string): Promise<MediaWithRelation[]> {
        const relations = await this.mediaRelationRepository.findByEntity(entityType, entityId);

        // Fetch media for each relation
        const result: MediaWithRelation[] = [];
        for (const relation of relations) {
            const media = await this.mediaRepository.findById(relation.mediaId);
            result.push({
                ...relation,
                media: media || undefined
            });
        }

        return result;
    }
}
