import { Architecture } from '../../entities/Architecture';
import { ArchitectureRepository } from '../../repositories/ArchitectureRepository';

export class ListArchitectures {
    constructor(private repository: ArchitectureRepository) { }
    async execute(type?: string): Promise<Architecture[]> {
        if (type) {
            return await this.repository.findByType(type);
        }
        return await this.repository.findAll();
    }
}
