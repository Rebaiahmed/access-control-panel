export interface AppEnvironment {
  production: boolean;
  apiBaseUrl: string;
  [key: string]: any;
}