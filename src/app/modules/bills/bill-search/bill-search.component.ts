import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FilterInterface } from '../../../shared/models/interfaces/filter.interface';
import { BillsService } from '../../../core/services/bills.service';
import { TagsService } from '../../../core/services/tags.service';

@Component({
  selector: 'app-bill-search',
  templateUrl: './bill-search.component.html',
  styleUrls: ['./bill-search.component.scss']
})
export class BillSearchComponent implements OnInit, OnDestroy {

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
  private searchInput: HTMLCollectionOf<Element>;
  private logoutButton: HTMLCollectionOf<Element>;
  private logo: HTMLCollectionOf<Element>;
  private isInputOpen = true;

  constructor(private billsService: BillsService, private tagsService: TagsService) {
    this.searchInput = document.getElementsByClassName('mat-form-field-infix');
    this.logo = document.getElementsByClassName('logo');
    this.logoutButton = document.getElementsByClassName('toolbar__button--logout');
  }

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
          this.filter = filter;
      })
    );
  }

  showSearchOption(text: string): void {
    if (text.length > 1) {
      this.search = text;
      this.billsService.filterBill(this.search).subscribe(
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
    console.log(this.searchOptions);
    this.searchIdList = [];
    if (this.searchOptions) {
      this.searchIdList = this.searchOptions.reduce((arr, option) => option.idList, []);
      console.log(this.searchIdList);
      this.filter.searchIdList = this.searchIdList;
      this.tagsService.filter.next(this.filter);
    }
    this.filterBills.emit();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
    if (this.isMobile) {
      this.isInputOpen = false;
      this.searchInput[0].setAttribute('style', 'width: 0px;');
    } else {
      this.searchInput[0].setAttribute('style', 'width: 240px;');
    }
  }

  toggleSearch() {
    if (this.isMobile) {
      if (this.isInputOpen) {
        this.searchInput[0].setAttribute('style', 'width: 0px; transition: width 0.3s ease-out;');
        this.logo[0].setAttribute('style', 'margin-left: 0; transition: margin-left 0.3s ease-out;');
        this.logoutButton[0].setAttribute('style', 'margin-right: 0; transition: margin-right 0.3s ease-out;');
      } else {
        this.searchInput[0].setAttribute('style', 'width: 240px; transition: width 0.3s ease-out;');
        this.logo[0].setAttribute('style', 'margin-left: -190px; transition: margin-left 0.3s ease-out;');
        this.logoutButton[0].setAttribute('style', 'margin-right: -90px; transition: margin-right 0.3s ease-out;');
      }
      this.isInputOpen = !this.isInputOpen;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
