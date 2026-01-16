import { ArtifactRepository } from '../../repositories/ArtifactRepository';

export class DeleteArtifact {
    constructor(private repository: ArtifactRepository) { }
    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
