import { AreaArchitecture } from '../../entities/AreaArchitecture';
import { AreaArchitectureRepository } from '../../repositories/AreaArchitectureRepository';

export class GetAreaArchitectures {
    constructor(private repository: AreaArchitectureRepository) { }
    async execute(areaId: string): Promise<AreaArchitecture[]> {
        return await this.repository.findByArea(areaId);
    }
}
