import { PlaceDynasty } from '../../entities/PlaceDynasty';
import { PlaceDynastyRepository } from '../../repositories/PlaceDynastyRepository';

export interface AddDynastyToPlaceDTO {
    placeId: string;
    dynastyId: string;
    role?: string;
    note?: string;
}

export class AddDynastyToPlace {
    constructor(private repository: PlaceDynastyRepository) { }

    async execute(data: AddDynastyToPlaceDTO): Promise<PlaceDynasty> {
        const existing = await this.repository.findByPlaceAndDynasty(data.placeId, data.dynastyId);
        if (existing) {
            throw new Error('This dynasty is already associated with this place');
        }

        return await this.repository.create({
            placeId: data.placeId,
            dynastyId: data.dynastyId,
            role: data.role,
            note: data.note
        });
    }
}
