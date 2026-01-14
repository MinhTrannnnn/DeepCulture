import { Deity } from '../entities/Deity';

export interface DeityRepository {
    create(deity: Deity): Promise<Deity>;
    findById(id: number): Promise<Deity | null>;
    findAll(): Promise<Deity[]>;
    update(id: number, data: Partial<Deity>): Promise<Deity>;
    delete(id: number): Promise<void>;
}
