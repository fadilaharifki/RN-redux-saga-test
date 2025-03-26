interface APIResponse<T> {
  page: number;
  limit: number;
  total: number;
  list: Array<T>;
  data: Array<T>;
}
