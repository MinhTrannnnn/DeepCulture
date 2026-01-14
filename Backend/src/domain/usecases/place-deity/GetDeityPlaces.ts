import { PlaceDeity } from '../../entities/PlaceDeity';
import { PlaceDeityRepository } from '../../repositories/PlaceDeityRepository';

export class GetDeityPlaces {
    constructor(private repository: PlaceDeityRepository) { }

    async execute(deityId: number): Promise<PlaceDeity[]> {
        return await this.repository.findByDeity(deityId);
    }
}
