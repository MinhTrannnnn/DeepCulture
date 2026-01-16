import { IntangibleHeritage } from '../entities/IntangibleHeritage';

export interface IntangibleHeritageRepository {
    create(heritage: Omit<IntangibleHeritage, 'id' | 'createdAt' | 'updatedAt'>): Promise<IntangibleHeritage>;
    findById(id: string): Promise<IntangibleHeritage | null>;
    findAll(): Promise<IntangibleHeritage[]>;
    findByName(name: string): Promise<IntangibleHeritage[]>;
    update(id: string, data: Partial<IntangibleHeritage>): Promise<IntangibleHeritage>;
    delete(id: string): Promise<void>;
}
