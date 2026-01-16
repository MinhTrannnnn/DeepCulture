import { IntangibleHeritage } from '../../entities/IntangibleHeritage';
import { IntangibleHeritageRepository } from '../../repositories/IntangibleHeritageRepository';

export class ListIntangibleHeritages {
    constructor(private repository: IntangibleHeritageRepository) { }

    async execute(searchName?: string): Promise<IntangibleHeritage[]> {
        if (searchName) {
            return await this.repository.findByName(searchName);
        }
        return await this.repository.findAll();
    }
}
