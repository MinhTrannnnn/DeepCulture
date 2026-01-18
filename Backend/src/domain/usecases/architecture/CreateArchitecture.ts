import { Architecture } from '../../entities/Architecture';
import { ArchitectureRepository } from '../../repositories/ArchitectureRepository';

export interface CreateArchitectureDTO {
    name: string;
    type?: string;
    material?: string;
    technique?: string;
    pattern?: string;
    description?: string;
    year?: number;
}

export class CreateArchitecture {
    constructor(private repository: ArchitectureRepository) { }

    async execute(data: CreateArchitectureDTO): Promise<Architecture> {
        if (!data.name) {
            throw new Error('Name is required');
        }
        return await this.repository.create(data);
    }
}
