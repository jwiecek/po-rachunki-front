import { Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Bill } from '../../../../shared/models/interfaces/bill.interface';
import * as moment from 'moment';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { TagsService } from '../../../../core/services/tags.service';
import { BillsService } from '../../../../core/services/bills.service';
import { HelpersData } from '../../../../shared/models/helpers';

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
  public filter: Observable<FilterInterface>;

  constructor(private tagsService: TagsService, private billsService: BillsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.onResize();
    this.filter = this.tagsService.currentFilter;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

  checkIfWarrantyOneMonth(bill: Bill): boolean {
    return moment(bill.warrantyEndDate).format('MM-DD-YYYY') > HelpersData.today() && moment(bill.warrantyEndDate)
      .format('MM-DD-YYYY') < HelpersData.todayPlusOneMonth();
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
