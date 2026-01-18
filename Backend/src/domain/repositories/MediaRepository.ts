import { Media } from '../entities/Media';

export interface MediaRepository {
    create(media: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>): Promise<Media>;
    findById(id: string): Promise<Media | null>;
    findAll(): Promise<Media[]>;
    update(id: string, data: Partial<Media>): Promise<Media>;
    delete(id: string): Promise<void>;
}
