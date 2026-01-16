import { AppDataSource } from '../../infra/database/postgres';
import { PersonDynastyModel } from '../models/PersonDynastyModel';
import { PersonDynasty } from '../../domain/entities/PersonDynasty';
import { PersonDynastyRepository } from '../../domain/repositories/PersonDynastyRepository';

export class PersonDynastyRepositoryImpl implements PersonDynastyRepository {
    private repository = AppDataSource.getRepository(PersonDynastyModel);

    async create(data: Omit<PersonDynasty, 'id' | 'createdAt' | 'updatedAt'>): Promise<PersonDynasty> {
        const model = this.repository.create({
            person_id: data.personId,
            dynasty_id: data.dynastyId,
            role: data.role,
            start_year: data.startYear,
            end_year: data.endYear
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<PersonDynasty | null> {
        const model = await this.repository.findOne({ where: { id }, relations: ['person', 'dynasty'] });
        return model ? this.toEntity(model) : null;
    }

    async findByPerson(personId: string): Promise<PersonDynasty[]> {
        const models = await this.repository.find({ where: { person_id: personId }, relations: ['dynasty'] });
        return models.map(m => this.toEntity(m));
    }

    async findByDynasty(dynastyId: string): Promise<PersonDynasty[]> {
        const models = await this.repository.find({ where: { dynasty_id: dynastyId }, relations: ['person'] });
        return models.map(m => this.toEntity(m));
    }

    async findByPersonAndDynasty(personId: string, dynastyId: string): Promise<PersonDynasty | null> {
        const model = await this.repository.findOne({ where: { person_id: personId, dynasty_id: dynastyId } });
        return model ? this.toEntity(model) : null;
    }

    async update(id: string, data: Partial<PersonDynasty>): Promise<PersonDynasty> {
        await this.repository.update(id, {
            role: data.role,
            start_year: data.startYear,
            end_year: data.endYear
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('PersonDynasty not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteByPersonAndDynasty(personId: string, dynastyId: string): Promise<void> {
        await this.repository.delete({ person_id: personId, dynasty_id: dynastyId });
    }

    private toEntity(model: PersonDynastyModel): PersonDynasty {
        return {
            id: model.id,
            personId: model.person_id,
            dynastyId: model.dynasty_id,
            role: model.role,
            startYear: model.start_year,
            endYear: model.end_year,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
