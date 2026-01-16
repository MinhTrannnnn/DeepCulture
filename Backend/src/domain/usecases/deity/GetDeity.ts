import { Deity } from '../../entities/Deity';
import { DeityRepository } from '../../repositories/DeityRepository';

export class GetDeity {
    constructor(private repository: DeityRepository) { }

    async execute(id: string): Promise<Deity | null> {
        return await this.repository.findById(id);
    }
}
