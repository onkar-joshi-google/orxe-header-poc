import { MicroAppRouteConfig } from './router.interface';

/**
 * ORXe app config
 */
export interface AppConfig {
  baseUrl: string;
}

/**
 * Acts as a type for injecting shell configuration in module initialization
 */
export interface OrxeModuleOptions {
  appConfig: AppConfig;
  routeConfigs?: MicroAppRouteConfig[];
}
