import { Person } from '../../entities/Person';
import { PersonRepository } from '../../repositories/PersonRepository';

export interface CreatePersonDTO {
    fullName: string;
    otherName?: string;
    birthYear?: number;
    deathYear?: number;
    hometown?: string;
    position?: string;
    field?: string;
    achievements?: string;
}

export class CreatePerson {
    constructor(private repository: PersonRepository) { }

    async execute(data: CreatePersonDTO): Promise<Person> {
        if (!data.fullName) {
            throw new Error('Full name is required');
        }

        return await this.repository.create({
            fullName: data.fullName,
            otherName: data.otherName,
            birthYear: data.birthYear,
            deathYear: data.deathYear,
            hometown: data.hometown,
            position: data.position,
            field: data.field,
            achievements: data.achievements
        });
    }
}
