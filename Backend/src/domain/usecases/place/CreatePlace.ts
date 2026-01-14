import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export interface CreatePlaceDTO {
    name: string;
    address: string;
    administrativeUnitId: number;
    latitude: number;
    longitude: number;
    description: string;
    historicalSignificance: string;
    visitingHours?: string;
    entryFee?: number;
    contactInfo?: string;
}

export class CreatePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(data: CreatePlaceDTO): Promise<Place> {
        if (!data.name || !data.address || !data.administrativeUnitId) {
            throw new Error('Name, address, and administrative unit are required');
        }

        const place: Place = {
            id: 0,
            name: data.name,
            address: data.address,
            administrativeUnitId: data.administrativeUnitId,
            latitude: data.latitude,
            longitude: data.longitude,
            description: data.description,
            historicalSignificance: data.historicalSignificance,
            visitingHours: data.visitingHours || '',
            entryFee: data.entryFee || 0,
            contactInfo: data.contactInfo || '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.repository.create(place);
    }
}
