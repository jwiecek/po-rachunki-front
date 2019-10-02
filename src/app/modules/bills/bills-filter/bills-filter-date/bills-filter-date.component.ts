import {Component, DoCheck, HostListener, Input, OnInit} from '@angular/core';
import {FilterInterface} from '../../../../shared/models/interfaces/filter.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {TagsService} from '../../../../core/services/tags.service';

@Component({
  selector: 'app-bills-filter-date',
  templateUrl: './bills-filter-date.component.html',
  styleUrls: ['./bills-filter-date.component.scss']
})
export class BillsFilterDateComponent implements OnInit, DoCheck {

  @Input() filters: FilterInterface;
  public isMobile: boolean;
  public dateForm: FormGroup;

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.onResize();
    this.dateForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl()
    });
  }

  ngDoCheck() {
    if (this.filters.purchaseDateFrom === null && this.filters.purchaseDateTo === null) {
      this.dateForm.setValue({
        fromDate: null,
        toDate: null
      });
    }
  }

  setRange(type: string): void {
    if (type === 'fromDate') {
      this.filters.purchaseDateFrom = this.dateForm.get('fromDate').value;
    } else if (type === 'toDate') {
      this.filters.purchaseDateTo = this.dateForm.get('toDate').value;
    }
    this.tagsService.filter.next(this.filters);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 660;
  }
}
