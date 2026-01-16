import { Artifact } from '../../entities/Artifact';
import { ArtifactRepository } from '../../repositories/ArtifactRepository';

export interface CreateArtifactDTO {
    name: string;
    type: string;
    weight?: number;
    year?: number;
    origin?: string;
    condition?: string;
    description?: string;
    symbolism?: string;
    areaId?: string;
}

export class CreateArtifact {
    constructor(private repository: ArtifactRepository) { }
    async execute(data: CreateArtifactDTO): Promise<Artifact> {
        if (!data.name || !data.type) {
            throw new Error('Name and type are required');
        }
        return await this.repository.create(data);
    }
}
