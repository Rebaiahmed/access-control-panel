import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, effect, input, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableAction, TableBtn, TableColumn } from './table-definitions.interface';

@Component({
  selector: 'lib-table',
  imports: [CommonModule,MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {

  columns = input<TableColumn<any>[]>([]);
  buttons = input<TableAction<any>[]>([]);
  data = input<unknown[]>([]);
  footer = input<string | null>(null);
  pagination = input<number[]>([]);
  pageSize = input(10);
  tableMinWidth = input(500);

  //buttonClick = output<[string, any]>();
  buttonClick = output<{ actionId: string; element: any }>();

  dataSource: MatTableDataSource<any>;

  displayedColumns = computed(() => {
    const cols = this.columns().map(c => c.columnDef);
    if (this.buttons().length > 0) {
      cols.push('actions');
    }
    return cols;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data());

    effect(() => {
      this.dataSource.data = this.data();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

   executeAction(actionId: string, element: any): void {
    alert('hehe')
    this.buttonClick.emit({ actionId, element });
  }




}
