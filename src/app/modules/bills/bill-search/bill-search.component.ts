import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FilterInterface } from '../../../shared/models/interfaces/filter.interface';
import { TagsService } from '../../../core/services/tags.service';

@Component({
  selector: 'app-bill-search',
  templateUrl: './bill-search.component.html',
  styleUrls: ['./bill-search.component.scss']
})
export class BillSearchComponent implements OnInit, OnDestroy {
  constructor(private tagsService: TagsService) {}

  public value;
  public searchOptions = [];
  public searchForm: FormGroup;
  private search: string;
  private searchIdList;
  @Output() filterBills = new EventEmitter<void>();
  @ViewChild('searchRef', {static: true}) searchRef: ElementRef;
  private filter: FilterInterface;
  private subscriptions: Subscription = new Subscription();
  public isMobile: boolean;

  ngOnInit() {
    this.onResize();
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
    fromEvent(this.searchRef.nativeElement, 'keyup')
      .pipe(
        map((evt: any) => evt.target.value),
        // filter(res => res.length > 1),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((text: string) => this.showSearchOption(text), error => console.warn('err: ' + error));

    this.subscriptions.add(
      this.tagsService.currentFilter.subscribe((filter: FilterInterface) => {
        setTimeout(() => {
          this.filter = filter;
        }, 1000);
      })
    );
  }

  showSearchOption(text: string): void {
    if (text.length > 1) {
      this.search = text;
      this.tagsService.filterBill(this.search).subscribe(
        res => {
          this.searchOptions = res;
        },
        error => console.warn('err: ' + error)
      );
    } else {
      this.clearSearchInput();
    }
  }

  clearSearchInput() {
    this.searchOptions = [];
    this.filter.searchIdList = [];
    this.tagsService.filter.next(this.filter);
    this.filterBills.emit();
  }

  getByFilter() {
    this.searchIdList = [];
    if (this.searchOptions) {
      this.searchIdList = this.searchOptions.reduce((arr, option) => option.idList, []);
      this.filter.searchIdList = this.searchIdList;
      this.tagsService.filter.next(this.filter);
    }
    this.filterBills.emit();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
