import { Component, OnInit } from '@angular/core';
import { BillsService } from '../../../core/services/bills.service';
import { Bill } from '../../../shared/models/interfaces/bill.interface';
import { Subscription } from 'rxjs';
import { FilterInterface } from '../../../shared/models/interfaces/filter.interface';
import { TagsService } from '../../../core/services/tags.service';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss']
})
export class BillsListComponent implements OnInit {

  public bills: Bill[] = [];
  public elementsView;
  private subscriptions: Subscription = new Subscription();
  private filters: FilterInterface;

  constructor(private billsService: BillsService, private tagsService: TagsService) { }

  ngOnInit() {
    this.getBills();
    this.subscriptions.add(this.tagsService.currentFilter.subscribe((filters: FilterInterface) => {
      this.filters = filters;
      this.filterBills();
    }));
    this.elementsView = this.billsService.elementsView;
  }

  getBills(): void {
    this.billsService.getBills().subscribe(
      (bills: Bill[]) => {
        this.bills = bills;
      },
      error => console.warn('err: ' + error)
    );
  }

  filterBills() {
    const filterObject = {
      selectedCategory: this.filters.categoryList.filter(category => category.selected === true).map(c => c.label),
      selectedPriceFrom: this.filters.selectedPriceFrom,
      selectedPriceTo: this.filters.selectedPriceTo,
      purchaseDateFrom: this.filters.purchaseDateFrom,
      purchaseDateTo: this.filters.purchaseDateTo,
      warrantyDateFrom: this.filters.warrantyFrom,
      warrantyDateTo: this.filters.warrantyTo,
      searchIdList: this.filters.searchIdList
    };

    this.billsService.filterAll(filterObject).subscribe(res => {
      this.bills = res;
      this.bills.sort((a, b) => +new Date(b.purchaseDate) - +new Date(a.purchaseDate));
      this.billsService.resultCount.next(this.bills.length);
    });
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  removeBill(id: string): void {
    this.billsService.removeBill(id).subscribe(
      () => {
        this.getBills();
      },
      error => console.warn('err: ' + error)
    );
  }

  trackById(index: number, bill: Bill) {
    return bill._id;
  }
}
