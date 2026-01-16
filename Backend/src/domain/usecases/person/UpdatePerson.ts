import { Person } from '../../entities/Person';
import { PersonRepository } from '../../repositories/PersonRepository';

export interface UpdatePersonDTO {
    fullName?: string;
    otherName?: string;
    birthYear?: number;
    deathYear?: number;
    hometown?: string;
    position?: string;
    field?: string;
    achievements?: string;
}

export class UpdatePerson {
    constructor(private repository: PersonRepository) { }

    async execute(id: string, data: UpdatePersonDTO): Promise<Person> {
        return await this.repository.update(id, data);
    }
}
