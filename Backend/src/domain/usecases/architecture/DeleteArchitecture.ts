import { ArchitectureRepository } from '../../repositories/ArchitectureRepository';

export class DeleteArchitecture {
    constructor(private repository: ArchitectureRepository) { }
    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
