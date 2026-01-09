import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export interface CreateAdministrativeUnitDTO {
    name: string;
    level: string;
}

export class CreateAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(data: CreateAdministrativeUnitDTO): Promise<AdministrativeUnit> {
        // Validation
        if (!data.name || !data.level) {
            throw new Error('Name and level are required');
        }

        if (!['province', 'district', 'commune'].includes(data.level)) {
            throw new Error('Invalid level. Must be: province, district, or commune');
        }

        // Create entity
        const unit: AdministrativeUnit = {
            id: 0, // sẽ được DB auto-generate
            name: data.name,
            level: data.level,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.repository.create(unit);
    }
}