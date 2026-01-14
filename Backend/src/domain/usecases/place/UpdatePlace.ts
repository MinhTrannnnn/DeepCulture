import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export interface UpdatePlaceDTO {
    name?: string;
    address?: string;
    administrativeUnitId?: number;
    latitude?: number;
    longitude?: number;
    description?: string;
    historicalSignificance?: string;
    visitingHours?: string;
    entryFee?: number;
    contactInfo?: string;
}

export class UpdatePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(id: number, data: UpdatePlaceDTO): Promise<Place> {
        return await this.repository.update(id, data);
    }
}
