interface CategoriesType {
  name?: string;
  value?: string;
  id?: number;
  pid: number | null;
  children?: CategoriesType[];
}
