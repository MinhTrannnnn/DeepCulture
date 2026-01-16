import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export interface UpdateAdministrativeUnitDTO {
    name?: string;
    level?: string;
}

export class UpdateAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(id: string, data: UpdateAdministrativeUnitDTO): Promise<AdministrativeUnit> {
        return await this.repository.update(id, data);
    }
}