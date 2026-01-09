import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export class ListAdministrativeUnits {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(level?: string): Promise<AdministrativeUnit[]> {
        return await this.repository.findAll(level);
    }
}