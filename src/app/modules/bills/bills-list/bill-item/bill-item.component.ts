import { Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Bill } from '../../../../shared/models/interfaces/bill.interface';
import * as moment from 'moment';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { TagsService } from '../../../../core/services/tags.service';
import { BillsService } from '../../../../core/services/bills.service';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.scss'],
})
export class BillItemComponent implements OnInit {

  @Input() bill: Bill;
  @Input() elementsView;
  @Output() removeBill: EventEmitter<string> = new EventEmitter<string>();

  public isMobile: boolean;
  private today;
  private todayPlusOneMonth;
  private todayPlusOneYear;
  public filter: Observable<FilterInterface>;

  constructor(private tagsService: TagsService, private billsService: BillsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.onResize();
    this.getDates();
    this.filter = this.tagsService.currentFilter;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

  getDates() {
    this.today = moment().format('MM-DD-YYYY');
    this.todayPlusOneMonth = moment(this.today).add(1, 'months').format('MM-DD-YYYY');
    this.todayPlusOneYear = moment(this.today).add(1, 'year').format('MM-DD-YYYY');
  }

  checkIfWarrantyOneMonth(bill: Bill): boolean {
    return moment(bill.warrantyEndDate).format('MM-DD-YYYY') > this.today && moment(bill.warrantyEndDate)
      .format('MM-DD-YYYY') < this.todayPlusOneMonth;
  }

  editBill(bill: Bill) {
    this.router.navigate(['./edit/', bill._id]);
  }

  removeSelectedBill(event: MouseEvent, id: string) {
    event.stopPropagation();
    if (id) {
      this.removeBill.emit(id);
    }
  }
}
