import { Artifact } from '../../entities/Artifact';
import { ArtifactRepository } from '../../repositories/ArtifactRepository';

export class ListArtifacts {
    constructor(private repository: ArtifactRepository) { }
    async execute(areaId?: string, type?: string): Promise<Artifact[]> {
        if (areaId) {
            return await this.repository.findByArea(areaId);
        }
        if (type) {
            return await this.repository.findByType(type);
        }
        return await this.repository.findAll();
    }
}
