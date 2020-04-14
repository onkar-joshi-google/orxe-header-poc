/**
 * Interface to define `type` of dependency and it's status
 */
export interface AppDependency {
  type: string;
  src: string;
  external?: boolean;
  status?: Status;
}

/**
 * Interface to define micro-app `type` with fields
 */
export interface MicroApp {
  name: string;
  tagName: string;
  bundle: string;
  version: string;
  dependencies?: AppDependency[];
  status?: Status;
}

/**
 * enum, indicates the status of the dependencies
 */
export enum Status {
  NOTFOUND = 0,
  LOADING = 1,
  LOADED = 2
}

/**
 * enum, used to create tags for injecting the dependency
 */
export enum DependencyType {
  script = 'application/javascript',
  link = ''
}
