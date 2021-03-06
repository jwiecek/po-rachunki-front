import {Component, HostListener, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FilterInterface } from '../../../shared/models/interfaces/filter.interface';
import { BillsService } from '../../../core/services/bills.service';
import { Tag } from '../../../shared/models/interfaces/tag.interface';
import { TagsService } from '../../../core/services/tags.service';
import { MatBottomSheetRef } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { ElementView } from '../../../shared/models/interfaces/elementView.interface';

@Component({
  selector: 'app-bills-filter',
  templateUrl: './bills-filter.component.html',
  styleUrls: ['./bills-filter.component.scss']
})
export class BillsFilterComponent implements OnInit {

  public categoryList;
  public tags: Tag[];
  private filter: Observable<FilterInterface>;
  public elementsView: Observable<ElementView>;
  public resultCount: Observable<number>;
  public isMobile: boolean;

  constructor(
    private billsService: BillsService,
    private tagsService: TagsService,
    private bottomSheetRef: MatBottomSheetRef<FilterDialogComponent>) { }

  ngOnInit() {
    this.getTags();
    this.filter = this.tagsService.currentFilter;
    this.elementsView = this.billsService.elementsView;
    this.resultCount = this.billsService.currentResultCount;
    this.onResize();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe((userTags: Tag[]) => {
      if (!userTags.length) {
        this.tagsService.getBasicTags().subscribe((tags: Tag[]) => {
          this.tags = tags;
        });
      } else {
        this.tags = userTags;
        this.categoryList = this.tags.filter((tag: Tag) => tag.type === 'purchaseType')
          .map(category => {
            category.selected = false;
            return category;
          });
        }
    });
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 660;
  }
}

