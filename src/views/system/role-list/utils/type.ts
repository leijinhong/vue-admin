export interface RoleType {
  id: number;
  name: string;
  rules: string;
  status: 1 | 2;
  created_at: string;
  updated_at: string;
  pid: number;
  children: RoleType[];
}
