export type Paginated<T> = {
    items: T[];
    page: number;
    totalPages: number;
    total: number;
};