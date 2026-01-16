import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export interface CreateDynastyDTO {
    name: string;
    startYear?: number;
    endYear?: number;
    description?: string;
}

export class CreateDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(data: CreateDynastyDTO): Promise<Dynasty> {
        if (!data.name) {
            throw new Error('Name is required');
        }

        // Check if dynasty name already exists
        const existing = await this.repository.findByName(data.name);
        if (existing) {
            throw new Error('Dynasty with this name already exists');
        }

        return await this.repository.create({
            name: data.name,
            startYear: data.startYear,
            endYear: data.endYear,
            description: data.description
        });
    }
}
