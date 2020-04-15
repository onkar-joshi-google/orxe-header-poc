/**
 * Acts as type for accepting route configuration
 */
export interface OrxeRoute {
  path: string;
  tagName?: string;
  redirectTo?: string;
  outlet?: string;
  default?: boolean;
}

/**
 * Acts as a type for Context level routes. eg. `search/*`
 */
export interface MicroAppRouteConfig {
  path: string;
  children: OrxeRoute[];
}

