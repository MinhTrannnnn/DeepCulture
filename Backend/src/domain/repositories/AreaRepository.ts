import { Area } from '../entities/Area';

export interface AreaRepository {
    create(area: Area): Promise<Area>;
    findById(id: number): Promise<Area | null>;
    findAll(): Promise<Area[]>;
    findByPlace(placeId: number): Promise<Area[]>;
    update(id: number, data: Partial<Area>): Promise<Area>;
    delete(id: number): Promise<void>;
}
