export interface Place {
    id: number;
    name: string;
    address: string;
    administrativeUnitId: number;
    latitude: number;
    longitude: number;
    description: string;
    historicalSignificance: string;
    visitingHours: string;
    entryFee: number;
    contactInfo: string;
    createdAt: Date;
    updatedAt: Date;
}
