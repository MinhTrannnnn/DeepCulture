import { IntangibleHeritage } from '../../entities/IntangibleHeritage';
import { IntangibleHeritageRepository } from '../../repositories/IntangibleHeritageRepository';

export interface CreateIntangibleHeritageDTO {
    name: string;
    type?: string;
    origin?: string;
    description?: string;
    significance?: string;
    community?: string;
    region?: string;
}

export class CreateIntangibleHeritage {
    constructor(private repository: IntangibleHeritageRepository) { }

    async execute(data: CreateIntangibleHeritageDTO): Promise<IntangibleHeritage> {
        if (!data.name) {
            throw new Error('Name is required');
        }
        return await this.repository.create(data);
    }
}
