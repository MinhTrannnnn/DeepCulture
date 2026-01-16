import { PlaceRepository } from '../../repositories/PlaceRepository';

export class DeletePlace {
    constructor(private repository: PlaceRepository) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
