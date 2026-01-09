import { AdministrativeUnit } from '../entities/AdministrativeUnit';

export interface AdministrativeUnitRepository {
    create(unit: AdministrativeUnit): Promise<AdministrativeUnit>;
    findById(id: number): Promise<AdministrativeUnit | null>;
    findAll(level?: string): Promise<AdministrativeUnit[]>;
    update(id: number, data: Partial<AdministrativeUnit>): Promise<AdministrativeUnit>;
    delete(id: number): Promise<void>;
}