import { IntangibleHeritageRepository } from '../../repositories/IntangibleHeritageRepository';

export class DeleteIntangibleHeritage {
    constructor(private repository: IntangibleHeritageRepository) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
