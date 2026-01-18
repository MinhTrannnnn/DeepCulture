import { AppDataSource } from '../../infra/database/postgres';
import { MediaModel } from '../models/MediaModel';
import { Media } from '../../domain/entities/Media';
import { MediaRepository } from '../../domain/repositories/MediaRepository';

export class MediaRepositoryImpl implements MediaRepository {
    private repository = AppDataSource.getRepository(MediaModel);

    async create(media: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>): Promise<Media> {
        const model = this.repository.create({
            media_type: media.mediaType,
            url: media.url,
            caption: media.caption,
            mime_type: media.mimeType,
            file_size: media.fileSize,
            width: media.width,
            height: media.height,
            duration: media.duration
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<Media | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Media[]> {
        const models = await this.repository.find({ order: { created_at: 'DESC' } });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<Media>): Promise<Media> {
        await this.repository.update(id, {
            caption: data.caption,
            media_type: data.mediaType
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Media not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: MediaModel): Media {
        return {
            id: model.id,
            mediaType: model.media_type,
            url: model.url,
            caption: model.caption,
            mimeType: model.mime_type,
            fileSize: model.file_size ? Number(model.file_size) : undefined,
            width: model.width,
            height: model.height,
            duration: model.duration,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
