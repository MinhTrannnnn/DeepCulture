import { PlaceIntangibleRepository } from '../../repositories/PlaceIntangibleRepository';

export class RemoveIntangibleFromPlace {
    constructor(private repository: PlaceIntangibleRepository) { }
    async execute(placeId: string, intangibleHeritageId: string): Promise<void> {
        const existing = await this.repository.findByPlaceAndIntangibleHeritage(placeId, intangibleHeritageId);
        if (!existing) throw new Error('Relationship not found');
        await this.repository.deleteByPlaceAndIntangibleHeritage(placeId, intangibleHeritageId);
    }
}
