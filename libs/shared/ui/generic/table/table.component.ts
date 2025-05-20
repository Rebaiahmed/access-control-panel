import { AfterViewInit, Component, computed, effect, input, OnInit, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableBtn, TableColumn } from './table-definitions.interface';

@Component({
  selector: 'lib-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterViewInit {

  columns = input<TableColumn<unknown>[]>([]);
  buttons = input<TableBtn<unknown>[]>([]);
  data = input<unknown[]>([]);
  footer = input<string | null>(null);
  pagination = input<number[]>([]);
  pageSize = input(10);
  tableMinWidth = input(500);

  buttonClick = output<[string, any]>();

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }





}
