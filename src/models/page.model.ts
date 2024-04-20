export interface Page<T> {
    page: number;
    pageSize: number;
    totalRecords: number;
    pageCount: number;
    data: T[];
}