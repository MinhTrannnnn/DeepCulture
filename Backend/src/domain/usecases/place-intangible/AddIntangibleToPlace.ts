import { PlaceIntangible } from '../../entities/PlaceIntangible';
import { PlaceIntangibleRepository } from '../../repositories/PlaceIntangibleRepository';

export interface AddIntangibleToPlaceDTO {
    placeId: string;
    intangibleHeritageId: string;
}

export class AddIntangibleToPlace {
    constructor(private repository: PlaceIntangibleRepository) { }

    async execute(data: AddIntangibleToPlaceDTO): Promise<PlaceIntangible> {
        const existing = await this.repository.findByPlaceAndIntangibleHeritage(data.placeId, data.intangibleHeritageId);
        if (existing) throw new Error('This intangible heritage is already associated with this place');
        return await this.repository.create(data);
    }
}
