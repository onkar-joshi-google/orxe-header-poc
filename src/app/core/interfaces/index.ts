export interface MenuItem {
  name: string;
  link: string;
  data: MenuData[];
  isVisible: boolean;
}

export interface MenuData {
  id: number;
}
