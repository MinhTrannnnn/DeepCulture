import { DeityRepository } from '../../repositories/DeityRepository';

export class DeleteDeity {
    constructor(private repository: DeityRepository) { }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
