import { HanNomInscription } from '../entities/HanNomInscription';

export interface HanNomInscriptionRepository {
    create(inscription: Omit<HanNomInscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<HanNomInscription>;
    findById(id: string): Promise<HanNomInscription | null>;
    findAll(): Promise<HanNomInscription[]>;
    findByArea(areaId: string): Promise<HanNomInscription[]>;
    update(id: string, data: Partial<HanNomInscription>): Promise<HanNomInscription>;
    delete(id: string): Promise<void>;
}
