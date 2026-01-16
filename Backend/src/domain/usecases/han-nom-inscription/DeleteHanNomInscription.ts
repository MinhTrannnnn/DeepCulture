import { HanNomInscriptionRepository } from '../../repositories/HanNomInscriptionRepository';

export class DeleteHanNomInscription {
    constructor(private repository: HanNomInscriptionRepository) { }
    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
