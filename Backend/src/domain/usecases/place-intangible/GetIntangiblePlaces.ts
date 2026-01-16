import { PlaceIntangible } from '../../entities/PlaceIntangible';
import { PlaceIntangibleRepository } from '../../repositories/PlaceIntangibleRepository';

export class GetIntangiblePlaces {
    constructor(private repository: PlaceIntangibleRepository) { }
    async execute(intangibleHeritageId: string): Promise<PlaceIntangible[]> {
        return await this.repository.findByIntangibleHeritage(intangibleHeritageId);
    }
}
