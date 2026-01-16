import { Area } from '../../entities/Area';
import { AreaRepository } from '../../repositories/AreaRepository';

export interface UpdateAreaDTO {
    name?: string;
    placeId?: string;
    areaType?: string;
    function?: string;
    description?: string;
}

export class UpdateArea {
    constructor(private repository: AreaRepository) { }

    async execute(id: string, data: UpdateAreaDTO): Promise<Area> {
        return await this.repository.update(id, data);
    }
}
