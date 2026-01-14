export interface Dynasty {
    id: number;
    name: string;
    startYear: number;
    endYear: number | null;
    capital: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
