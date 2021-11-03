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

export enum AvailableToastVariant {
    error = 'error',
    info = 'info'
}