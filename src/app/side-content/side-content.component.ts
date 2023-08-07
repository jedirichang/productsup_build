import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.scss']
})
export class SideContentComponent implements OnInit {
  columns: any;
  operators: string[] = [];
  get createFilterForm() {
    return this.fb.group({
      key: ['', Validators.required],
      operator: ['', Validators.required],
      text: ['', Validators.required],
    })
  }

  get filterForm(): FormArray {
    return this.formGroup.controls.filters as FormArray;
  }

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.extractCloumns();
    this.columns = this.dataService.getColumns();
    this.operators = this.dataService.getOperators();
  }

  formGroup = this.fb.group({
    filters: this.fb.array([], Validators.required)
  });

  addFilter(): void {
    this.filterForm.push(this.createFilterForm);
  }

  removeFilter(index: number): void {
    this.filterForm.removeAt(index);
    if (!this.filterForm.length) {
      this.applyFilter();
    }
  }

  clearForm(): void {
    this.formGroup = this.fb.group({
      filters: this.fb.array([])
    });
    this.applyFilter();
  }
  applyFilter(): void {
    this.dataService.setFilters(this.formGroup.value.filters as []);
    this.dataService.generateTableData();
  }
}
