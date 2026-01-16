import { Architecture } from '../entities/Architecture';

export interface ArchitectureRepository {
    create(architecture: Omit<Architecture, 'id' | 'createdAt' | 'updatedAt'>): Promise<Architecture>;
    findById(id: string): Promise<Architecture | null>;
    findAll(): Promise<Architecture[]>;
    findByType(type: string): Promise<Architecture[]>;
    update(id: string, data: Partial<Architecture>): Promise<Architecture>;
    delete(id: string): Promise<void>;
}
