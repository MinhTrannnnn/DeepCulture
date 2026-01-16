import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export interface CreateAdministrativeUnitDTO {
    name: string;
    level: string;
}

export class CreateAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(data: CreateAdministrativeUnitDTO): Promise<AdministrativeUnit> {
        if (!data.name || !data.level) {
            throw new Error('Name and level are required');
        }

        return await this.repository.create({
            name: data.name,
            level: data.level
        });
    }
}