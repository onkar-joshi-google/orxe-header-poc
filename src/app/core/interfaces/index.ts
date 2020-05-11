export interface MenuItem {
  name: string;
  link: string;
  data: MenuData[];
  hasAccess: boolean;
}

export interface MenuData {
  id: number;
}
