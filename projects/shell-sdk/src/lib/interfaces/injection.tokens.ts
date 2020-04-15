import { InjectionToken } from '@angular/core';
import { MicroAppRouteConfig } from './router.interface';
import { AppConfig } from './app.interface';

/**
 * Token used to inject route configuration at module level
 */
export const ROUTER_CONFIGS = new InjectionToken<MicroAppRouteConfig[]>('ROUTER_CONFIGS');

/**
 * Token used to inject app config at module level
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
