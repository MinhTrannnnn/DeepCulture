import { PersonDynasty } from '../../entities/PersonDynasty';
import { PersonDynastyRepository } from '../../repositories/PersonDynastyRepository';

export class GetDynastyPersons {
    constructor(private repository: PersonDynastyRepository) { }
    async execute(dynastyId: string): Promise<PersonDynasty[]> {
        return await this.repository.findByDynasty(dynastyId);
    }
}
