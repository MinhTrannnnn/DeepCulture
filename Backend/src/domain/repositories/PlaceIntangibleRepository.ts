import { PlaceIntangible } from '../entities/PlaceIntangible';

export interface PlaceIntangibleRepository {
    create(data: Omit<PlaceIntangible, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlaceIntangible>;
    findById(id: string): Promise<PlaceIntangible | null>;
    findByPlace(placeId: string): Promise<PlaceIntangible[]>;
    findByIntangibleHeritage(intangibleHeritageId: string): Promise<PlaceIntangible[]>;
    findByPlaceAndIntangibleHeritage(placeId: string, intangibleHeritageId: string): Promise<PlaceIntangible | null>;
    delete(id: string): Promise<void>;
    deleteByPlaceAndIntangibleHeritage(placeId: string, intangibleHeritageId: string): Promise<void>;
}
