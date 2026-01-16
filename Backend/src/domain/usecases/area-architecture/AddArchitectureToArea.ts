import { AreaArchitecture } from '../../entities/AreaArchitecture';
import { AreaArchitectureRepository } from '../../repositories/AreaArchitectureRepository';

export interface AddArchitectureToAreaDTO {
    areaId: string;
    architectureId: string;
    position?: string;
}

export class AddArchitectureToArea {
    constructor(private repository: AreaArchitectureRepository) { }

    async execute(data: AddArchitectureToAreaDTO): Promise<AreaArchitecture> {
        const existing = await this.repository.findByAreaAndArchitecture(data.areaId, data.architectureId);
        if (existing) throw new Error('This architecture is already associated with this area');
        return await this.repository.create(data);
    }
}
