import { Deity } from '../../entities/Deity';
import { DeityRepository } from '../../repositories/DeityRepository';

export class ListDeities {
    constructor(private repository: DeityRepository) { }

    async execute(): Promise<Deity[]> {
        return await this.repository.findAll();
    }
}
