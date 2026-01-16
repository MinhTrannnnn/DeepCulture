import { IntangibleHeritage } from '../../entities/IntangibleHeritage';
import { IntangibleHeritageRepository } from '../../repositories/IntangibleHeritageRepository';

export interface UpdateIntangibleHeritageDTO {
    name?: string;
    type?: string;
    origin?: string;
    description?: string;
    significance?: string;
    community?: string;
    region?: string;
}

export class UpdateIntangibleHeritage {
    constructor(private repository: IntangibleHeritageRepository) { }

    async execute(id: string, data: UpdateIntangibleHeritageDTO): Promise<IntangibleHeritage> {
        return await this.repository.update(id, data);
    }
}
