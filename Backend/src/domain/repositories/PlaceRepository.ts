import { Place } from '../entities/Place';

export interface PlaceRepository {
    create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place>;
    findById(id: string): Promise<Place | null>;
    findAll(): Promise<Place[]>;
    findByAdministrativeUnit(administrativeUnitId: string): Promise<Place[]>;
    update(id: string, data: Partial<Place>): Promise<Place>;
    delete(id: string): Promise<void>;
}
