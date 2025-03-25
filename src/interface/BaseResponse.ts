interface APIResponse<T> {
  page: number;
  limit: number;
  total: number;
  list: Array<T>;
}
