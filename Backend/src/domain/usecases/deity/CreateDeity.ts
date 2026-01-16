import { Deity } from '../../entities/Deity';
import { DeityRepository } from '../../repositories/DeityRepository';

export interface CreateDeityDTO {
    name: string;
    type?: string;
    origin?: string;
    legend?: string;
}

export class CreateDeity {
    constructor(private repository: DeityRepository) { }

    async execute(data: CreateDeityDTO): Promise<Deity> {
        if (!data.name) {
            throw new Error('Name is required');
        }

        return await this.repository.create({
            name: data.name,
            type: data.type,
            origin: data.origin,
            legend: data.legend
        });
    }
}
