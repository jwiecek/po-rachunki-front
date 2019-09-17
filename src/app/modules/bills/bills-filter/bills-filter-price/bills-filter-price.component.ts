import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterInterface} from '../../../../shared/models/interfaces/filter.interface';
import {TagsService} from '../../../../core/services/tags.service';

@Component({
  selector: 'app-bills-filter-price',
  templateUrl: './bills-filter-price.component.html',
  styleUrls: ['./bills-filter-price.component.scss']
})
export class BillsFilterPriceComponent implements OnInit {

  @Input() filters: FilterInterface;
  isMobile: boolean;
  public dateForm: FormGroup;

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.onResize();
    this.dateForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl()
    });
  }

  setRange(type) {
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
