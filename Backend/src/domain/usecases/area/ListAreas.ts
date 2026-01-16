import { Area } from '../../entities/Area';
import { AreaRepository } from '../../repositories/AreaRepository';

export class ListAreas {
    constructor(private repository: AreaRepository) { }

    async execute(placeId?: string): Promise<Area[]> {
        if (placeId) {
            return await this.repository.findByPlace(placeId);
        }
        return await this.repository.findAll();
    }
}
