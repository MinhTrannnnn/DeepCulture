import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export class ListPlaces {
    constructor(private repository: PlaceRepository) { }

    async execute(administrativeUnitId?: number): Promise<Place[]> {
        if (administrativeUnitId) {
            return await this.repository.findByAdministrativeUnit(administrativeUnitId);
        }
        return await this.repository.findAll();
    }
}
