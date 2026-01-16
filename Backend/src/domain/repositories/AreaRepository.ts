import { Area } from '../entities/Area';

export interface AreaRepository {
    create(area: Omit<Area, 'id' | 'createdAt' | 'updatedAt'>): Promise<Area>;
    findById(id: string): Promise<Area | null>;
    findAll(): Promise<Area[]>;
    findByPlace(placeId: string): Promise<Area[]>;
    update(id: string, data: Partial<Area>): Promise<Area>;
    delete(id: string): Promise<void>;
}
