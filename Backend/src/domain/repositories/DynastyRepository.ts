import { Dynasty } from '../entities/Dynasty';

export interface DynastyRepository {
    create(dynasty: Omit<Dynasty, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dynasty>;
    findById(id: string): Promise<Dynasty | null>;
    findAll(): Promise<Dynasty[]>;
    findByName(name: string): Promise<Dynasty | null>;
    update(id: string, data: Partial<Dynasty>): Promise<Dynasty>;
    delete(id: string): Promise<void>;
}
