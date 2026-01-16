import { PlaceDeity } from '../../entities/PlaceDeity';
import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export class GetPlaceDeities {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(placeId: string): Promise<PlaceDeity[]> {
        return await this.repository.findByPlace(placeId);
    }
}
