import { InjectionToken } from '@angular/core';
/**
 * @description
 * Defines a unique token for injecting the **base API URL**.
 * This allows safe and flexible dependency injection of the API endpoint into services and libraries.
 */
export const API_URL = new InjectionToken<string>('API_URL');