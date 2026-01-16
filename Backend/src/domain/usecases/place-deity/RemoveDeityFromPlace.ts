import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export class RemoveDeityFromPlace {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(placeId: string, deityId: string): Promise<void> {
        const existing = await this.repository.findByPlaceAndDeity(placeId, deityId);
        if (!existing) {
            throw new Error('Relationship not found');
        }
        await this.repository.deleteByPlaceAndDeity(placeId, deityId);
    }
}
