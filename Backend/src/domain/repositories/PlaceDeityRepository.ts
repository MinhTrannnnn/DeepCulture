import { PlaceDeity } from '../entities/PlaceDeity';

export interface PlaceDeityRepository {
    create(placeDeity: Omit<PlaceDeity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceDeity>;
    findById(id: string): Promise<PlaceDeity | null>;
    findByPlace(placeId: string): Promise<PlaceDeity[]>;
    findByDeity(deityId: string): Promise<PlaceDeity[]>;
    findByPlaceAndDeity(placeId: string, deityId: string): Promise<PlaceDeity | null>;
    update(id: string, data: Partial<PlaceDeity>): Promise<PlaceDeity>;
    delete(id: string): Promise<void>;
    deleteByPlaceAndDeity(placeId: string, deityId: string): Promise<void>;
}
