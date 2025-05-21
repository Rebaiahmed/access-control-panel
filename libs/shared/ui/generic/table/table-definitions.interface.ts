export interface TableColumn<T> {
  columnDef: string;
  header: string;
    cell: (element: T) => any;
}

export interface TableBtn<T> {
  actionId?: string; 
  action: string;
  icon: string;
  styleClass?: string;
 onClick: (element: any) => void; 
}

export interface TableAction<T = any> {
  actionId: string;
  icon: string;
  tooltip: string;
  color?: 'primary' | 'accent' | 'warn' | 'basic' | 'link';
  disabled?: (element: T) => boolean;
  show?: (element: T) => boolean;
}

