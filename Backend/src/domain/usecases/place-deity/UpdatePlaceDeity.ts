import { PlaceDeity } from '../../entities/PlaceDeity';
import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export interface UpdatePlaceDeityDTO {
    role?: string;
    worshipType?: string;
    significanceLevel?: string;
    notes?: string;
}

export class UpdatePlaceDeity {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(placeId: string, deityId: string, data: UpdatePlaceDeityDTO): Promise<PlaceDeity> {
        const existing = await this.repository.findByPlaceAndDeity(placeId, deityId);
        if (!existing) {
            throw new Error('Relationship not found');
        }
        return await this.repository.update(existing.id, data);
    }
}
