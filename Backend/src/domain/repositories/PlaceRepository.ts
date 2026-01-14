import { Place } from '../entities/Place';

export interface PlaceRepository {
    create(place: Place): Promise<Place>;
    findById(id: number): Promise<Place | null>;
    findAll(): Promise<Place[]>;
    findByAdministrativeUnit(administrativeUnitId: number): Promise<Place[]>;
    update(id: number, data: Partial<Place>): Promise<Place>;
    delete(id: number): Promise<void>;
}
