import { Area } from '../../entities/Area';
import { AreaRepository } from '../../repositories/AreaRepository';

export interface CreateAreaDTO {
    name: string;
    placeId?: string;
    areaType?: string;
    function?: string;
    description?: string;
}

export class CreateArea {
    constructor(private repository: AreaRepository) { }

    async execute(data: CreateAreaDTO): Promise<Area> {
        if (!data.name) {
            throw new Error('Name is required');
        }

        return await this.repository.create({
            name: data.name,
            placeId: data.placeId,
            areaType: data.areaType,
            function: data.function,
            description: data.description
        });
    }
}
