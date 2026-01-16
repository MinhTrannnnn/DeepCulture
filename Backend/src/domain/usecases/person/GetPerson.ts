import { Person } from '../../entities/Person';
import { PersonRepository } from '../../repositories/PersonRepository';

export class GetPerson {
    constructor(private repository: PersonRepository) { }

    async execute(id: string): Promise<Person | null> {
        return await this.repository.findById(id);
    }
}
