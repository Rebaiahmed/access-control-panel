export interface TableColumn<T> {
  columnDef: string;
  header: string;
    cell: (element: T) => any;
}
export interface TableAction<T = any> {
  actionId: string;
  icon: string;
  tooltip: string;
  color?: 'primary' | 'accent' | 'warn' | 'basic' | 'link';
  disabled?: (element: T) => boolean;
  show?: (element: T) => boolean;
}

