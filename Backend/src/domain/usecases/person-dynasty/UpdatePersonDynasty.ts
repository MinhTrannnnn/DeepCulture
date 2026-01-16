import { PersonDynasty } from '../../entities/PersonDynasty';
import { PersonDynastyRepository } from '../../repositories/PersonDynastyRepository';

export interface UpdatePersonDynastyDTO {
    role?: string;
    startYear?: number;
    endYear?: number;
}

export class UpdatePersonDynasty {
    constructor(private repository: PersonDynastyRepository) { }
    async execute(personId: string, dynastyId: string, data: UpdatePersonDynastyDTO): Promise<PersonDynasty> {
        const existing = await this.repository.findByPersonAndDynasty(personId, dynastyId);
        if (!existing) throw new Error('Relationship not found');
        return await this.repository.update(existing.id, data);
    }
}
