import { AreaArchitecture } from '../entities/AreaArchitecture';

export interface AreaArchitectureRepository {
    create(data: Omit<AreaArchitecture, 'id' | 'createdAt' | 'updatedAt'>): Promise<AreaArchitecture>;
    findById(id: string): Promise<AreaArchitecture | null>;
    findByArea(areaId: string): Promise<AreaArchitecture[]>;
    findByArchitecture(architectureId: string): Promise<AreaArchitecture[]>;
    findByAreaAndArchitecture(areaId: string, architectureId: string): Promise<AreaArchitecture | null>;
    update(id: string, data: Partial<AreaArchitecture>): Promise<AreaArchitecture>;
    delete(id: string): Promise<void>;
    deleteByAreaAndArchitecture(areaId: string, architectureId: string): Promise<void>;
}
