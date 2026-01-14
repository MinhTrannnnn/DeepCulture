import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export interface CreateDynastyDTO {
    name: string;
    startYear: number;
    endYear?: number | null;
    capital: string;
    description: string;
}

export class CreateDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(data: CreateDynastyDTO): Promise<Dynasty> {
        if (!data.name || !data.startYear || !data.capital) {
            throw new Error('Name, start year, and capital are required');
        }

        // Check if dynasty name already exists
        const existing = await this.repository.findByName(data.name);
        if (existing) {
            throw new Error('Dynasty with this name already exists');
        }

        const dynasty: Dynasty = {
            id: 0,
            name: data.name,
            startYear: data.startYear,
            endYear: data.endYear || null,
            capital: data.capital,
            description: data.description,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.repository.create(dynasty);
    }
}
