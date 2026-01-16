import { Deity } from '../entities/Deity';

export interface DeityRepository {
    create(deity: Omit<Deity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deity>;
    findById(id: string): Promise<Deity | null>;
    findAll(): Promise<Deity[]>;
    update(id: string, data: Partial<Deity>): Promise<Deity>;
    delete(id: string): Promise<void>;
}
