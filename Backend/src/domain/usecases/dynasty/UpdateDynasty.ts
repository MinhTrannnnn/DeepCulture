import { Dynasty } from '../../entities/Dynasty';
import { DynastyRepository } from '../../repositories/DynastyRepository';

export interface UpdateDynastyDTO {
    name?: string;
    startYear?: number;
    endYear?: number;
    description?: string;
}

export class UpdateDynasty {
    constructor(private repository: DynastyRepository) { }

    async execute(id: string, data: UpdateDynastyDTO): Promise<Dynasty> {
        return await this.repository.update(id, data);
    }
}
