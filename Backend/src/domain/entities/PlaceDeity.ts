export interface PlaceDeity {
    id: string;
    placeId: string;
    deityId: string;
    role?: string;
    worshipType?: string;
    significanceLevel?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
