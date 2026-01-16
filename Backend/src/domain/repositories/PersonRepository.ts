import { Person } from '../entities/Person';

export interface PersonRepository {
    create(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person>;
    findById(id: string): Promise<Person | null>;
    findAll(): Promise<Person[]>;
    findByName(name: string): Promise<Person[]>;
    update(id: string, data: Partial<Person>): Promise<Person>;
    delete(id: string): Promise<void>;
}
