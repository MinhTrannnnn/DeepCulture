import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export interface UpdateAdministrativeUnitDTO {
    name?: string;
    level?: string;
}

export class UpdateAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(id: number, data: UpdateAdministrativeUnitDTO): Promise<AdministrativeUnit> {
        // Validation
        if (data.level && !['province', 'district', 'commune'].includes(data.level)) {
            throw new Error('Invalid level');
        }

        return await this.repository.update(id, data);
    }
}