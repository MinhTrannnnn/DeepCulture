import { PlaceDynasty } from '../../entities/PlaceDynasty';
import { PlaceDynastyRepository } from '../../repositories/PlaceDynastyRepository';

export class GetPlaceDynasties {
    constructor(private repository: PlaceDynastyRepository) { }

    async execute(placeId: string): Promise<PlaceDynasty[]> {
        return await this.repository.findByPlace(placeId);
    }
}
