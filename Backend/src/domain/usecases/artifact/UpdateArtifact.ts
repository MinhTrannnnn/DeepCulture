import { Artifact } from '../../entities/Artifact';
import { ArtifactRepository } from '../../repositories/ArtifactRepository';

export interface UpdateArtifactDTO {
    name?: string;
    type?: string;
    weight?: number;
    year?: number;
    origin?: string;
    condition?: string;
    description?: string;
    symbolism?: string;
    areaId?: string;
}

export class UpdateArtifact {
    constructor(private repository: ArtifactRepository) { }
    async execute(id: string, data: UpdateArtifactDTO): Promise<Artifact> {
        return await this.repository.update(id, data);
    }
}
