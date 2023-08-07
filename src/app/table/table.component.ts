import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  ngUnsubscribe$: Subject<null> = new Subject();

  tableData: any[] = [];
  columnDef: any;
  pageSize = 15;
  pageIndex = 0;

  get currentPageIndex() {
    return this.dataService.getPageIndex();
  }
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listenTableData();
    this.fetchTableData();
  }

  paginate(state: number): void {
    this.dataService.paginate(state);
  }

  listenTableData(): void {
    this.dataService.tableData$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (data) => {
          this.tableData = data.data;
          this.columnDef = data.columnDef;
        }
      })
  }

  fetchTableData(): void {
    this.dataService.generateTableData();
  }
}
