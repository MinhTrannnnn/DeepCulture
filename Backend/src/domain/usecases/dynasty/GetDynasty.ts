import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export class GetDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(id: number): Promise<Dynasty | null> {
        return await this.repository.findById(id);
    }
}
