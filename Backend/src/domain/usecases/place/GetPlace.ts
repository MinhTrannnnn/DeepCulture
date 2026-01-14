import { Place } from '../../entities/Place';
import { PlaceRepository } from '../../repositories/PlaceRepository';

export class GetPlace {
    constructor(private repository: PlaceRepository) { }

    async execute(id: number): Promise<Place | null> {
        return await this.repository.findById(id);
    }
}
