export interface Ship {
    id: string;
    name?: string;
    image?: string;
}

export interface Launch {
    id: string;
    name: string;
    description: string;
    date: string;
    images: Ship[];
}