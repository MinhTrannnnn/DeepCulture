import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export class DeleteAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}