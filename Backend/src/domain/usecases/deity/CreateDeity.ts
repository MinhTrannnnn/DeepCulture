import { Deity } from '../../entities/Deity';
import { DeityRepository } from '../../repositories/DeityRepository';

export interface CreateDeityDTO {
    name: string;
    type: string;
    origin: string;
    legend: string;
}

export class CreateDeity {
    constructor(private repository: DeityRepository) { }

    async execute(data: CreateDeityDTO): Promise<Deity> {
        if (!data.name || !data.type) {
            throw new Error('Name and type are required');
        }

        const deity: Deity = {
            id: 0,
            name: data.name,
            type: data.type,
            origin: data.origin,
            legend: data.legend,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.repository.create(deity);
    }
}
