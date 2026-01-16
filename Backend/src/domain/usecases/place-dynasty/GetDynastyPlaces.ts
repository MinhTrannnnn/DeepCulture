import { PlaceDynasty } from '../../entities/PlaceDynasty';
import { PlaceDynastyRepository } from '../../repositories/PlaceDynastyRepository';

export class GetDynastyPlaces {
    constructor(private repository: PlaceDynastyRepository) { }

    async execute(dynastyId: string): Promise<PlaceDynasty[]> {
        return await this.repository.findByDynasty(dynastyId);
    }
}
