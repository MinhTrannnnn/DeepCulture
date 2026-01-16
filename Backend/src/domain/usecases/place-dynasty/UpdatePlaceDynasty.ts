import { PlaceDynasty } from '../../entities/PlaceDynasty';
import { PlaceDynastyRepository } from '../../repositories/PlaceDynastyRepository';

export interface UpdatePlaceDynastyDTO {
    role?: string;
    note?: string;
}

export class UpdatePlaceDynasty {
    constructor(private repository: PlaceDynastyRepository) { }

    async execute(placeId: string, dynastyId: string, data: UpdatePlaceDynastyDTO): Promise<PlaceDynasty> {
        const existing = await this.repository.findByPlaceAndDynasty(placeId, dynastyId);
        if (!existing) {
            throw new Error('Relationship not found');
        }
        return await this.repository.update(existing.id, data);
    }
}
