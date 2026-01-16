import { Architecture } from '../../entities/Architecture';
import { ArchitectureRepository } from '../../repositories/ArchitectureRepository';

export class GetArchitecture {
    constructor(private repository: ArchitectureRepository) { }
    async execute(id: string): Promise<Architecture | null> {
        return await this.repository.findById(id);
    }
}
