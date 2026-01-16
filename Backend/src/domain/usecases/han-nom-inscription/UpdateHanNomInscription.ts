import { HanNomInscription } from '../../entities/HanNomInscription';
import { HanNomInscriptionRepository } from '../../repositories/HanNomInscriptionRepository';

export interface UpdateHanNomInscriptionDTO {
    type?: string;
    location?: string;
    transcription?: string;
    translation?: string;
    imageUrl?: string;
    year?: number;
    condition?: string;
    areaId?: string;
}

export class UpdateHanNomInscription {
    constructor(private repository: HanNomInscriptionRepository) { }
    async execute(id: string, data: UpdateHanNomInscriptionDTO): Promise<HanNomInscription> {
        return await this.repository.update(id, data);
    }
}
