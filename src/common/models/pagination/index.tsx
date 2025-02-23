export interface ResponseEntityPagination<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: T[];
}

export interface SearchRequestPagination {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
}
