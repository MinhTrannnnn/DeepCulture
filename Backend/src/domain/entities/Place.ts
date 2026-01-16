export interface Place {
    id: string;
    name: string;
    commonName?: string;
    type?: string;
    address?: string;
    longitude?: number;
    latitude?: number;
    establishedYear?: number;
    landArea?: number;
    status?: string;
    description?: string;
    history?: string;
    administrativeUnitId?: string;
    createdAt: Date;
    updatedAt: Date;
}
