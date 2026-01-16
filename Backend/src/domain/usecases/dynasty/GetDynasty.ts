import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export class GetDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(id: string): Promise<Dynasty | null> {
        return await this.repository.findById(id);
    }
}
