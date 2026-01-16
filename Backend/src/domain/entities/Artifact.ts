export interface Artifact {
    id: string;
    name: string;
    type: string;
    weight?: number;
    year?: number;
    origin?: string;
    condition?: string;
    description?: string;
    symbolism?: string;
    areaId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
