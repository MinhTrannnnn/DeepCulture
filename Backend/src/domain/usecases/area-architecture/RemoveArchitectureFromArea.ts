import { AreaArchitectureRepository } from '../../repositories/AreaArchitectureRepository';

export class RemoveArchitectureFromArea {
    constructor(private repository: AreaArchitectureRepository) { }
    async execute(areaId: string, architectureId: string): Promise<void> {
        const existing = await this.repository.findByAreaAndArchitecture(areaId, architectureId);
        if (!existing) throw new Error('Relationship not found');
        await this.repository.deleteByAreaAndArchitecture(areaId, architectureId);
    }
}
