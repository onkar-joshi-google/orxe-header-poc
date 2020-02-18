export interface OrxeRoute {
  path: string;
  tagName?: string;
  redirectTo?: string;
  outlet?: string;
  default?: boolean;
}

export interface ResolvedRoute {
  path: string;
  resolvedPath: string;
  route: OrxeRoute;
  query?: { [key: string]: string | number | boolean };
  outlet?: string;
}
