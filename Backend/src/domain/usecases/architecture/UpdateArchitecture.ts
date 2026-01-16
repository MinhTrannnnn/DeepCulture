import { Architecture } from '../../entities/Architecture';
import { ArchitectureRepository } from '../../repositories/ArchitectureRepository';

export interface UpdateArchitectureDTO {
    name?: string;
    type?: string;
    material?: string;
    technique?: string;
    pattern?: string;
    description?: string;
    imageUrl?: string;
    year?: number;
}

export class UpdateArchitecture {
    constructor(private repository: ArchitectureRepository) { }
    async execute(id: string, data: UpdateArchitectureDTO): Promise<Architecture> {
        return await this.repository.update(id, data);
    }
}
