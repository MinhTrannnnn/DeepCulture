import { Area } from '../../entities/Area';
import { AreaRepository } from '../../repositories/AreaRepository';

export interface CreateAreaDTO {
    name: string;
    placeId: number;
    areaType: string;
    description: string;
}

export class CreateArea {
    constructor(private repository: AreaRepository) { }

    async execute(data: CreateAreaDTO): Promise<Area> {
        if (!data.name || !data.placeId || !data.areaType) {
            throw new Error('Name, place ID, and area type are required');
        }

        const area: Area = {
            id: 0,
            name: data.name,
            placeId: data.placeId,
            areaType: data.areaType,
            description: data.description,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.repository.create(area);
    }
}
