import { AreaArchitecture } from '../../entities/AreaArchitecture';
import { AreaArchitectureRepository } from '../../repositories/AreaArchitectureRepository';

export class UpdateAreaArchitecture {
    constructor(private repository: AreaArchitectureRepository) { }
    async execute(areaId: string, architectureId: string, data: { position?: string }): Promise<AreaArchitecture> {
        const existing = await this.repository.findByAreaAndArchitecture(areaId, architectureId);
        if (!existing) throw new Error('Relationship not found');
        return await this.repository.update(existing.id, data);
    }
}
