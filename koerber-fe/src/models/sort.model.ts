export type SortConfig<T> = {
  column: keyof T;
  order: string;
};
