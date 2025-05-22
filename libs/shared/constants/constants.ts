export interface ConfirmDialogConfig {
  width: string;
  message: (itemName: string) => string;
  buttons: {
    confirm: string;
    cancel: string;
  };
}

export const DELETE_ROLE_DIALOG: ConfirmDialogConfig = {
  width: '350px',
  message: (roleName: string) => `Are you sure you want to delete role "${roleName}"?`,
  buttons: {
    confirm: 'Delete',
    cancel: 'Cancel'
  }
};