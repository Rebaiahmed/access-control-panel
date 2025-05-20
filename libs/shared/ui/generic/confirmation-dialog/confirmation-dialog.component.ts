import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface ConfirmationDialogData {
  message: string;
  buttonText?: {
    ok: string;
    cancel: string;
  };
}

@Component({
  selector: 'lib-confirmation-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">
        {{ cancelButtonText }}
      </button>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        {{ confirmButtonText }}
      </button>
    </div>
  `,
  styles: [
    `
      .mat-dialog-actions {
        justify-content: flex-end;
        margin-bottom: 0;
      }
    `,
  ],
})
export class ConfirmationDialogComponent {
  message = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogData>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
