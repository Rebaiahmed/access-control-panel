import { InjectionToken } from '@angular/core';
import { AppEnvironment } from './environment.model';

export const API_URL = new InjectionToken<string>('API_URL');