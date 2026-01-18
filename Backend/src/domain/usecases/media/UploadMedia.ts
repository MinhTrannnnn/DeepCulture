import { Media } from '../../entities/Media';
import { MediaRepository } from '../../repositories/MediaRepository';
import { S3Storage } from '../../../infra/storage/S3Storage';

export interface UploadMediaDTO {
    file: Express.Multer.File;
    caption?: string;
    folder?: string;
}

export class UploadMedia {
    constructor(
        private mediaRepository: MediaRepository,
        private s3Storage: S3Storage
    ) { }

    async execute(data: UploadMediaDTO): Promise<Media> {
        // Upload to S3
        const result = await this.s3Storage.uploadImage(data.file, data.folder || 'images');

        // Save metadata to database
        const media = await this.mediaRepository.create({
            mediaType: 'image',
            url: result.url,
            caption: data.caption,
            mimeType: result.mimeType,
            fileSize: result.fileSize,
            width: result.width,
            height: result.height
        });

        return media;
    }
}
