import { PersonDynasty } from '../../entities/PersonDynasty';
import { PersonDynastyRepository } from '../../repositories/PersonDynastyRepository';

export interface AddDynastyToPersonDTO {
    personId: string;
    dynastyId: string;
    role?: string;
    startYear?: number;
    endYear?: number;
}

export class AddDynastyToPerson {
    constructor(private repository: PersonDynastyRepository) { }

    async execute(data: AddDynastyToPersonDTO): Promise<PersonDynasty> {
        const existing = await this.repository.findByPersonAndDynasty(data.personId, data.dynastyId);
        if (existing) throw new Error('This dynasty is already associated with this person');
        return await this.repository.create(data);
    }
}
