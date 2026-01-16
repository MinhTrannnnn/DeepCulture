import { PersonDynasty } from '../entities/PersonDynasty';

export interface PersonDynastyRepository {
    create(data: Omit<PersonDynasty, 'id' | 'createdAt' | 'updatedAt'>): Promise<PersonDynasty>;
    findById(id: string): Promise<PersonDynasty | null>;
    findByPerson(personId: string): Promise<PersonDynasty[]>;
    findByDynasty(dynastyId: string): Promise<PersonDynasty[]>;
    findByPersonAndDynasty(personId: string, dynastyId: string): Promise<PersonDynasty | null>;
    update(id: string, data: Partial<PersonDynasty>): Promise<PersonDynasty>;
    delete(id: string): Promise<void>;
    deleteByPersonAndDynasty(personId: string, dynastyId: string): Promise<void>;
}
