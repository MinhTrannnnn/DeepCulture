import { HanNomInscription } from '../../entities/HanNomInscription';
import { HanNomInscriptionRepository } from '../../repositories/HanNomInscriptionRepository';

export interface CreateHanNomInscriptionDTO {
    type?: string;
    location?: string;
    transcription?: string;
    translation?: string;
    year?: number;
    condition?: string;
    areaId?: string;
}

export class CreateHanNomInscription {
    constructor(private repository: HanNomInscriptionRepository) { }
    async execute(data: CreateHanNomInscriptionDTO): Promise<HanNomInscription> {
        return await this.repository.create(data);
    }
}
