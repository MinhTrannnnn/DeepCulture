import { PlaceRepository } from '../../repositories/PlaceRepository';

export class DeletePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
