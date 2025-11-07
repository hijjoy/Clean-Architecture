export type Pagination<T> = {
  page: number
  results: T[]
  totalPages: number
  totalResults: number
}
