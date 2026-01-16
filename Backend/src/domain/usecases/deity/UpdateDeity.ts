import { Deity } from '../../entities/Deity';
import { DeityRepository } from '../../repositories/DeityRepository';

export interface UpdateDeityDTO {
    name?: string;
    type?: string;
    origin?: string;
    legend?: string;
}

export class UpdateDeity {
    constructor(private repository: DeityRepository) { }

    async execute(id: string, data: UpdateDeityDTO): Promise<Deity> {
        return await this.repository.update(id, data);
    }
}
