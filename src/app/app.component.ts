import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { TableData } from './interfaces/tableData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dataService: DataService) {
    this.dataService.initiateData();
  }
}
