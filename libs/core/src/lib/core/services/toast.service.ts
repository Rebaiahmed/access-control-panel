import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * @description
 * Service for displaying various types of toast notifications (success, error, info, warning)
 * across the application, providing consistent messaging and styling.
 */

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom'
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action = 'Close', config?: MatSnackBarConfig): void {
    this.show(message, action, { 
      ...this.defaultConfig, 
      ...config,
      panelClass: ['success-notification']
    });
  }

  error(message: string, action = 'Close', config?: MatSnackBarConfig): void {
    this.show(message, action, { 
      ...this.defaultConfig, 
      ...config,
      panelClass: ['error-notification']
    });
  }

  info(message: string, action = 'Close', config?: MatSnackBarConfig): void {
    this.show(message, action, { 
      ...this.defaultConfig, 
      ...config,
      panelClass: ['info-notification']
    });
  }

  warning(message: string, action = 'Close', config?: MatSnackBarConfig): void {
    this.show(message, action, { 
      ...this.defaultConfig, 
      ...config,
      panelClass: ['warning-notification'] 
    });
  }

  private show(message: string, action: string, config: MatSnackBarConfig): void {
    this.snackBar.open(message, action, config);
  }
}
