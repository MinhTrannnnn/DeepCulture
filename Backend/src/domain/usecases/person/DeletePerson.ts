import { PersonRepository } from '../../repositories/PersonRepository';

export class DeletePerson {
    constructor(private repository: PersonRepository) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
