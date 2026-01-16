import { AppDataSource } from '../../infra/database/postgres';
import { PersonModel } from '../models/PersonModel';
import { Person } from '../../domain/entities/Person';
import { PersonRepository } from '../../domain/repositories/PersonRepository';
import { ILike } from 'typeorm';

export class PersonRepositoryImpl implements PersonRepository {
    private repository = AppDataSource.getRepository(PersonModel);

    async create(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person> {
        const model = this.repository.create({
            full_name: person.fullName,
            other_name: person.otherName,
            birth_year: person.birthYear,
            death_year: person.deathYear,
            hometown: person.hometown,
            position: person.position,
            field: person.field,
            achievements: person.achievements
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findById(id: string): Promise<Person | null> {
        const model = await this.repository.findOne({ where: { id } });
        return model ? this.toEntity(model) : null;
    }

    async findAll(): Promise<Person[]> {
        const models = await this.repository.find({ order: { full_name: 'ASC' } });
        return models.map(m => this.toEntity(m));
    }

    async findByName(name: string): Promise<Person[]> {
        const models = await this.repository.find({
            where: [
                { full_name: ILike(`%${name}%`) },
                { other_name: ILike(`%${name}%`) }
            ]
        });
        return models.map(m => this.toEntity(m));
    }

    async update(id: string, data: Partial<Person>): Promise<Person> {
        await this.repository.update(id, {
            full_name: data.fullName,
            other_name: data.otherName,
            birth_year: data.birthYear,
            death_year: data.deathYear,
            hometown: data.hometown,
            position: data.position,
            field: data.field,
            achievements: data.achievements
        });
        const updated = await this.repository.findOne({ where: { id } });
        if (!updated) throw new Error('Person not found');
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(model: PersonModel): Person {
        return {
            id: model.id,
            fullName: model.full_name,
            otherName: model.other_name,
            birthYear: model.birth_year,
            deathYear: model.death_year,
            hometown: model.hometown,
            position: model.position,
            field: model.field,
            achievements: model.achievements,
            createdAt: model.created_at,
            updatedAt: model.updated_at
        };
    }
}
