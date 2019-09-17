import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Bill } from '../../../../shared/models/interfaces/bill.interface';
import * as moment from 'moment';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { BillPhotoDialogComponent } from '../../../../shared/dialogs/bill-photo-dialog/bill-photo-dialog.component';
import { MatDialog } from '@angular/material';
import { TagsService } from '../../../../core/services/tags.service';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(private tagsService: TagsService, private router: Router, public dialog: MatDialog) { }

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
    this.today = moment();
    this.todayPlusOneMonth = moment(this.today).add(1, 'months');
    this.todayPlusOneYear = moment(this.today).add(1, 'year');
  }

  checkIfWarrantyOneMonth(bill: Bill): boolean {
    return moment(bill.warrantyEndDate) > this.today && moment(bill.warrantyEndDate) < this.todayPlusOneMonth;
  }

  expandPanel(bill: Bill): void {
    this.bill.expand = !bill.expand;
  }

  showBillPhoto(url): void {
    const dialogWidth = this.isMobile ? '100vw' : '350px';
    this.dialog.open(BillPhotoDialogComponent, {
      width: dialogWidth,
      data: { urlPhoto: url }
    });
  }

  editBill(bill) {
    this.router.navigate(['./edit/', bill._id]);
  }

  removeSelectedBill(id) {
    if (id) {
      this.removeBill.emit(id);
    }
  }
}
