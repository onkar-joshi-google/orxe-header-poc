import { InjectionToken } from '@angular/core';
import { MicroAppRouteConfig } from './router.interface';
/**
 * Token used to inject route configuration at module level
 */
export const ROUTER_CONFIGS = new InjectionToken<MicroAppRouteConfig[]>('ROUTER_CONFIGS');
