import { HanNomInscription } from '../../entities/HanNomInscription';
import { HanNomInscriptionRepository } from '../../repositories/HanNomInscriptionRepository';

export class GetHanNomInscription {
    constructor(private repository: HanNomInscriptionRepository) { }
    async execute(id: string): Promise<HanNomInscription | null> {
        return await this.repository.findById(id);
    }
}
