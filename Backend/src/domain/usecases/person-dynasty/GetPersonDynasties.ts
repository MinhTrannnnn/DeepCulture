import { PersonDynasty } from '../../entities/PersonDynasty';
import { PersonDynastyRepository } from '../../repositories/PersonDynastyRepository';

export class GetPersonDynasties {
    constructor(private repository: PersonDynastyRepository) { }
    async execute(personId: string): Promise<PersonDynasty[]> {
        return await this.repository.findByPerson(personId);
    }
}
