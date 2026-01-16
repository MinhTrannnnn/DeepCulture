import { PlaceDynasty } from '../entities/PlaceDynasty';

export interface PlaceDynastyRepository {
    create(data: Omit<PlaceDynasty, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceDynasty>;
    findById(id: string): Promise<PlaceDynasty | null>;
    findByPlace(placeId: string): Promise<PlaceDynasty[]>;
    findByDynasty(dynastyId: string): Promise<PlaceDynasty[]>;
    findByPlaceAndDynasty(placeId: string, dynastyId: string): Promise<PlaceDynasty | null>;
    update(id: string, data: Partial<PlaceDynasty>): Promise<PlaceDynasty>;
    delete(id: string): Promise<void>;
    deleteByPlaceAndDynasty(placeId: string, dynastyId: string): Promise<void>;
}
