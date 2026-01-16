import { PlaceIntangible } from '../../entities/PlaceIntangible';
import { PlaceIntangibleRepository } from '../../repositories/PlaceIntangibleRepository';

export class GetPlaceIntangibles {
    constructor(private repository: PlaceIntangibleRepository) { }
    async execute(placeId: string): Promise<PlaceIntangible[]> {
        return await this.repository.findByPlace(placeId);
    }
}
