import { PlaceDeity } from '../../entities/PlaceDeity';
import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export interface UpdatePlaceDeityDTO {
    worshipType?: string;
    significanceLevel?: string;
    notes?: string;
}

export class UpdatePlaceDeity {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(placeId: number, deityId: number, data: UpdatePlaceDeityDTO): Promise<PlaceDeity> {
        const existing = await this.repository.findByPlaceAndDeity(placeId, deityId);
        if (!existing) {
            throw new Error('Relationship not found');
        }
        return await this.repository.update(existing.id, data);
    }
}
