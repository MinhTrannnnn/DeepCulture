import { PlaceDeity } from '../entities/PlaceDeity';

export interface PlaceDeityRepository {
    create(placeDeity: PlaceDeity): Promise<PlaceDeity>;
    findById(id: number): Promise<PlaceDeity | null>;
    findByPlace(placeId: number): Promise<PlaceDeity[]>;
    findByDeity(deityId: number): Promise<PlaceDeity[]>;
    findByPlaceAndDeity(placeId: number, deityId: number): Promise<PlaceDeity | null>;
    update(id: number, data: Partial<PlaceDeity>): Promise<PlaceDeity>;
    delete(id: number): Promise<void>;
    deleteByPlaceAndDeity(placeId: number, deityId: number): Promise<void>;
}
