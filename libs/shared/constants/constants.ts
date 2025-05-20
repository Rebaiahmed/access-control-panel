export const DELETE_ROLE_DIALOG = {
  width: '350px',
  message: (roleName: string) => `Are you sure you want to delete role "${roleName}"?`,
  buttons: {
    confirm: 'Delete',
    cancel: 'Cancel'
  }
};