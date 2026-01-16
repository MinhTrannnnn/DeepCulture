import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export interface UpdatePlaceDTO {
    name?: string;
    commonName?: string;
    type?: string;
    address?: string;
    longitude?: number;
    latitude?: number;
    establishedYear?: number;
    landArea?: number;
    status?: string;
    description?: string;
    history?: string;
    administrativeUnitId?: string;
}

export class UpdatePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(id: string, data: UpdatePlaceDTO): Promise<Place> {
        return await this.repository.update(id, data);
    }
}
