import { PlaceDeity } from '../../entities/PlaceDeity';
import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export interface AddDeityToPlaceDTO {
    placeId: string;
    deityId: string;
    role?: string;
    worshipType?: string;
    significanceLevel?: string;
    notes?: string;
}

export class AddDeityToPlace {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(data: AddDeityToPlaceDTO): Promise<PlaceDeity> {
        // Check if relationship already exists
        const existing = await this.repository.findByPlaceAndDeity(data.placeId, data.deityId);
        if (existing) {
            throw new Error('This deity is already associated with this place');
        }

        return await this.repository.create({
            placeId: data.placeId,
            deityId: data.deityId,
            role: data.role,
            worshipType: data.worshipType,
            significanceLevel: data.significanceLevel,
            notes: data.notes
        });
    }
}
