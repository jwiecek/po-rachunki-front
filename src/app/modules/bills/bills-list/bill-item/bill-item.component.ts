import { Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Bill } from '../../../../shared/models/interfaces/bill.interface';
import * as moment from 'moment';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { TagsService } from '../../../../core/services/tags.service';
import { BillsService } from '../../../../core/services/bills.service';
import { HelpersData } from '../../../../shared/models/helpers';
import { ElementView } from '../../../../shared/models/interfaces/elementView.interface';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.scss'],
})
export class BillItemComponent implements OnInit {

  @Input() bill: Bill;
  @Input() elementsView: ElementView;
  @Output() removeBill: EventEmitter<string> = new EventEmitter<string>();
  public isMobile: boolean;
  public filter: Observable<FilterInterface>;

  constructor(private tagsService: TagsService, private billsService: BillsService, private router: Router) { }

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
    return moment(bill.warrantyEndDate, 'MM-DD-YYYY').format('MM-DD-YYYY') >
      HelpersData.today() && moment(bill.warrantyEndDate, 'MM-DD-YYYY').format('MM-DD-YYYY') <
      HelpersData.todayPlusOneMonth();
  }

  editBill(bill: Bill): void {
    this.router.navigate(['./edit/', bill._id]);
  }

  removeSelectedBill(event: MouseEvent, id: string): void {
    event.stopPropagation();
    if (id) {
      this.removeBill.emit(id);
    }
  }
}
