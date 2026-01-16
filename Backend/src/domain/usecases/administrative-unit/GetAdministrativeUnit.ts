import { AdministrativeUnit } from '../../entities/AdministrativeUnit';
import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export class GetAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(id: string): Promise<AdministrativeUnit | null> {
        return await this.repository.findById(id);
    }
}