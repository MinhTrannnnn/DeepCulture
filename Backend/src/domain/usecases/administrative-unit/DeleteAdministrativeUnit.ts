import { AdministrativeUnitRepository } from '../../repositories/AdministrativeUnitRepository';

export class DeleteAdministrativeUnit {
    constructor(private repository: AdministrativeUnitRepository) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}