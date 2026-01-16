import { Artifact } from '../entities/Artifact';

export interface ArtifactRepository {
    create(artifact: Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Artifact>;
    findById(id: string): Promise<Artifact | null>;
    findAll(): Promise<Artifact[]>;
    findByArea(areaId: string): Promise<Artifact[]>;
    findByType(type: string): Promise<Artifact[]>;
    update(id: string, data: Partial<Artifact>): Promise<Artifact>;
    delete(id: string): Promise<void>;
}
