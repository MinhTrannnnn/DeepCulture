import { Artifact } from '../../entities/Artifact';
import { ArtifactRepository } from '../../repositories/ArtifactRepository';

export class GetArtifact {
    constructor(private repository: ArtifactRepository) { }
    async execute(id: string): Promise<Artifact | null> {
        return await this.repository.findById(id);
    }
}
