export interface Person {
    id: string;
    fullName: string;
    otherName?: string;
    birthYear?: number;
    deathYear?: number;
    hometown?: string;
    position?: string;
    field?: string;
    achievements?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
