export interface TableColumn<T> {
  columnDef: string;
  header: string;
    cell: (element: T) => any;
}

export interface TableBtn<T> {
  action: string;
  icon: string;
  styleClass?: string;
 payload: (element: T) => any;
}