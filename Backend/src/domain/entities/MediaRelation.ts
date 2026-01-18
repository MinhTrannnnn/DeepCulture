export interface MediaRelation {
    id: string;
    mediaId: string;
    entityType: string;  // place, area, artifact, person...
    entityId: string;
    role?: string;       // cover, gallery, avatar, thumbnail
    orderIndex?: number;
    createdAt?: Date;
}