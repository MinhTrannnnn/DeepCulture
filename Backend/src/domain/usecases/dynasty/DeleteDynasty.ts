import { DynastyRepository } from '../../repositories/DynastyRepository';

export class DeleteDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
