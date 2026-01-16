import { AdministrativeUnit } from '../entities/AdministrativeUnit';

export interface AdministrativeUnitRepository {
    create(unit: Omit<AdministrativeUnit, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdministrativeUnit>;
    findById(id: string): Promise<AdministrativeUnit | null>;
    findAll(level?: string): Promise<AdministrativeUnit[]>;
    update(id: string, data: Partial<AdministrativeUnit>): Promise<AdministrativeUnit>;
    delete(id: string): Promise<void>;
}