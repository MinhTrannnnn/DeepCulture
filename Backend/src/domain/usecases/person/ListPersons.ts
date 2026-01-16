import { Person } from '../../entities/Person';
import { PersonRepository } from '../../repositories/PersonRepository';

export class ListPersons {
    constructor(private repository: PersonRepository) { }

    async execute(searchName?: string): Promise<Person[]> {
        if (searchName) {
            return await this.repository.findByName(searchName);
        }
        return await this.repository.findAll();
    }
}
