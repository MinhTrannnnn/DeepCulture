import { Dynasty } from '../entities/Dynasty';

export interface DynastyRepository {
    create(dynasty: Dynasty): Promise<Dynasty>;
    findById(id: number): Promise<Dynasty | null>;
    findAll(): Promise<Dynasty[]>;
    findByName(name: string): Promise<Dynasty | null>;
    update(id: number, data: Partial<Dynasty>): Promise<Dynasty>;
    delete(id: number): Promise<void>;
}
