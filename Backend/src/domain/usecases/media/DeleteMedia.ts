import { MediaRepository } from '../../repositories/MediaRepository';
import { MediaRelationRepository } from '../../repositories/MediaRelationRepository';
import { S3Storage } from '../../../infra/storage/S3Storage';

export class DeleteMedia {
    constructor(
        private mediaRepository: MediaRepository,
        private mediaRelationRepository: MediaRelationRepository,
        private s3Storage: S3Storage
    ) { }

    async execute(mediaId: string): Promise<void> {
        const media = await this.mediaRepository.findById(mediaId);
        if (!media) throw new Error('Media not found');

        // Extract S3 key from URL
        const urlParts = media.url.split('/');
        const key = urlParts.slice(3).join('/'); // Get path after bucket

        // Delete from S3
        try {
            await this.s3Storage.deleteFile(key);
        } catch (error) {
            console.error('Failed to delete from S3:', error);
        }

        // Delete relations first
        await this.mediaRelationRepository.deleteByMedia(mediaId);

        // Delete media record
        await this.mediaRepository.delete(mediaId);
    }
}
