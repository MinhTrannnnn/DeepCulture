import { PlaceDynastyRepository } from '../../repositories/PlaceDynastyRepository';

export class RemoveDynastyFromPlace {
    constructor(private repository: PlaceDynastyRepository) { }

    async execute(placeId: string, dynastyId: string): Promise<void> {
        const existing = await this.repository.findByPlaceAndDynasty(placeId, dynastyId);
        if (!existing) {
            throw new Error('Relationship not found');
        }
        await this.repository.deleteByPlaceAndDynasty(placeId, dynastyId);
    }
}
