import { HanNomInscription } from '../../entities/HanNomInscription';
import { HanNomInscriptionRepository } from '../../repositories/HanNomInscriptionRepository';

export class ListHanNomInscriptions {
    constructor(private repository: HanNomInscriptionRepository) { }
    async execute(areaId?: string): Promise<HanNomInscription[]> {
        if (areaId) {
            return await this.repository.findByArea(areaId);
        }
        return await this.repository.findAll();
    }
}
