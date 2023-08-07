import { Injectable } from '@angular/core';
import { ColumnDef, TableData } from '../interfaces/tableData.interface';
import { tableDataSource } from 'src/app/constants/tableData.constant';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * Since we are expecting to have completely random key value pairs as per the assignment, 
   * I am not setting the typed interface.
   */
  unfilteredData: any;
  tableData: Subject<any> = new Subject();
  tableData$ = this.tableData.asObservable();
  headers: any;
  columns: ColumnDef[] = [];
  filters: any = [];
  pageIndex = 0;

  operators = ['=', '>=', '<=', 'contains', '!='];

  constructor() { }

  initiateData(): void {
    this.massageDataForTable();
    this.extractCloumns();
  }

  massageDataForTable(): void {
    const massagedData = Object.values(tableDataSource)
    this.unfilteredData = Object.values(massagedData);
  }

  extractCloumns(): void {
    const keyNames = Object.keys(this.unfilteredData[0]);
    this.columns = keyNames.map((key: any) => ({
      columnDef: key,
      header: key.split('_').join(' ').toUpperCase(),
      cell: (element: any) => element[key]
    }))
  }

  setFilters(filters: any): void {
    this.filters = filters;
    this.pageIndex = 0;
  }

  generateTableData(): void {
    const start = this.pageIndex * 15;
    const end = start + 15;
    const tableData = this.unfilteredData.filter((data: any) => {
      for (let filter of this.filters) {
        if (!this.setupFilter(filter, data[filter['key']]))
          return false;
      }
      return true;
    });
    this.tableData.next(
      {
        data: tableData.slice(start, end),
        columnDef: this.columns
      });
  }

  paginate(state: number): void {
    if (state == 1) {
      this.pageIndex += 1;
      this.generateTableData();
      return;
    }
    this.pageIndex -= 1;
    this.generateTableData();
  }


  getColumns(): ColumnDef[] {
    return this.columns;
  }

  getPageIndex(): number {
    return this.pageIndex;
  }

  getOperators(): string[] {
    return this.operators;
  }

  setupFilter(filter: any, filterValue: any): boolean {
    const value = filter.text;
    const filterValueNumber = Number(filterValue);
    switch (filter.operator) {
      case '=':
        if (value == filterValue)
          return true;
        return false;
      case '>=':
        if (Number.isNaN(filterValueNumber)) return true;
        if (filterValue >= value)
          return true;
        return false;
      case '<=':
        if (Number.isNaN(filterValueNumber)) return true;
        if (filterValue <= value)
          return true;
        return false;
      case 'contains':
        if (filterValue.toUpperCase().toString().includes(value.toUpperCase().toString()))
          return true;
        return false;
      case '!=':
        if (value != filterValue)
          return true;
        return false;
      default:
        return true;
    }
  }

}
