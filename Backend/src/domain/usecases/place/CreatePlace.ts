import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export interface CreatePlaceDTO {
    name: string;
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

export class CreatePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(data: CreatePlaceDTO): Promise<Place> {
        if (!data.name) {
            throw new Error('Name is required');
        }

        return await this.repository.create({
            name: data.name,
            commonName: data.commonName,
            type: data.type,
            address: data.address,
            longitude: data.longitude,
            latitude: data.latitude,
            establishedYear: data.establishedYear,
            landArea: data.landArea,
            status: data.status,
            description: data.description,
            history: data.history,
            administrativeUnitId: data.administrativeUnitId
        });
    }
}
