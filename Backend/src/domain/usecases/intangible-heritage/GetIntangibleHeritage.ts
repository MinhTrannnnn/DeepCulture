import { IntangibleHeritage } from '../../entities/IntangibleHeritage';
import { IntangibleHeritageRepository } from '../../repositories/IntangibleHeritageRepository';

export class GetIntangibleHeritage {
    constructor(private repository: IntangibleHeritageRepository) { }

    async execute(id: string): Promise<IntangibleHeritage | null> {
        return await this.repository.findById(id);
    }
}
