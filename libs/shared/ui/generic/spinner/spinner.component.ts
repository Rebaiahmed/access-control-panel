import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * @description
 * A reusable Angular Material spinner component.
 * Displays a customizable loading indicator.
 */

@Component({
  selector: 'lib-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="spinner-container">
      <mat-spinner [diameter]="diameter()" [color]="color()"></mat-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class SpinnerComponent {
  diameter = input(50);
  color = input<'primary' | 'accent' | 'warn'>('primary');
}