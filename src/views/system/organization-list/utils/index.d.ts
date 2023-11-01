interface OrganizationItemType {
  id?: number;
  name?: string;
  pid: number;
  level?: number;
  children?: OrganizationItemType[];
}
