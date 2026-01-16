import { Area } from '../../entities/Area';
import { AreaRepository } from '../../repositories/AreaRepository';

export class GetArea {
    constructor(private repository: AreaRepository) { }

    async execute(id: string): Promise<Area | null> {
        return await this.repository.findById(id);
    }
}
