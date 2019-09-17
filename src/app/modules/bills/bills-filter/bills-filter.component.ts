import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterInterface } from '../../../shared/models/interfaces/filter.interface';
import { BillsService } from '../../../core/services/bills.service';
import { Tag } from '../../../shared/models/interfaces/tag.interface';
import { TagsService } from '../../../core/services/tags.service';

@Component({
  selector: 'app-bills-filter',
  templateUrl: './bills-filter.component.html',
  styleUrls: ['./bills-filter.component.scss']
})
export class BillsFilterComponent implements OnInit {

  public categoryList;
  public tags: Tag[];
  private filter: Observable<FilterInterface>;
  public elementsView;

  constructor(private billsService: BillsService, private tagsService: TagsService) { }

  ngOnInit() {
    this.getTags();
    this.getFilters();
    this.elementsView = this.billsService.elementsView;
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

  getFilters(): void {
    this.filter = this.tagsService.currentFilter;
  }
}
