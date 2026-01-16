import { PersonDynastyRepository } from '../../repositories/PersonDynastyRepository';

export class RemoveDynastyFromPerson {
    constructor(private repository: PersonDynastyRepository) { }
    async execute(personId: string, dynastyId: string): Promise<void> {
        const existing = await this.repository.findByPersonAndDynasty(personId, dynastyId);
        if (!existing) throw new Error('Relationship not found');
        await this.repository.deleteByPersonAndDynasty(personId, dynastyId);
    }
}
