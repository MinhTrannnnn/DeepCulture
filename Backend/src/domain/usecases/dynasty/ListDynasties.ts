import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export class ListDynasties {
    constructor(private repository: DynastyRepository) { }

    async execute(): Promise<Dynasty[]> {
        return await this.repository.findAll();
    }
}
