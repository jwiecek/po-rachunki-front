import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WarrantyOptionsEnum} from '../../../../shared/models/enums/warranty-option.enum';
import {FilterInterface} from '../../../../shared/models/interfaces/filter.interface';
import {TagsService} from '../../../../core/services/tags.service';
import * as moment from 'moment';
import { HelpersData } from '../../../../shared/models/helpers';

@Component({
  selector: 'app-bills-filter-warranty',
  templateUrl: './bills-filter-warranty.component.html',
  styleUrls: ['./bills-filter-warranty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillsFilterWarrantyComponent implements OnInit {

  @Input() filters: FilterInterface;
  isMobile: boolean;
  public warrantyForm: FormGroup;
  public warrantyOptions = [];

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.onResize();
    this.warrantyForm = new FormGroup({
      fromWarranty: new FormControl(),
      toWarranty: new FormControl()
    });
    this.warrantyOptions = Object.values(WarrantyOptionsEnum);
  }

  setWarrantyOption(option: string): void {
    if (option !== WarrantyOptionsEnum.RANGE) {
      this.filters.warrantyFrom = null;
      this.filters.warrantyTo = null;
    }
    this.filters.selectedWarranty = option;

    if (this.filters.selectedWarranty === WarrantyOptionsEnum.OVERDUE) {
      this.filters.warrantyTo = HelpersData.today();
    }
    if (this.filters.selectedWarranty === WarrantyOptionsEnum.END_IN_ONE_MONTH) {
      this.filters.warrantyFrom = HelpersData.today();
      this.filters.warrantyTo = HelpersData.todayPlusOneMonth();
    }
    if (this.filters.selectedWarranty === WarrantyOptionsEnum.END_IN_ONE_YEAR) {
      this.filters.warrantyFrom = HelpersData.today();
      this.filters.warrantyTo = HelpersData.todayPlusOneYear();
    }
    if (this.filters.selectedWarranty === WarrantyOptionsEnum.RANGE) {
      this.filters.warrantyFrom = moment(this.filters.warrantyFrom).format('MM-DD-YYYY');
      this.filters.warrantyTo = moment(this.filters.warrantyTo).format('MM-DD-YYYY');
    }
    this.tagsService.filter.next(this.filters);
  }

  setRange(type) {
    if (type === 'fromWarranty') {
      this.filters.warrantyFrom = this.warrantyForm.get('fromWarranty').value;
    } else if (type === 'toWarranty') {
      this.filters.warrantyTo = this.warrantyForm.get('toWarranty').value;
    }
    this.tagsService.filter.next(this.filters);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 660;
  }

}
