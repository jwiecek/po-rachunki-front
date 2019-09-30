import { Component, Input } from '@angular/core';
import { TagsService } from '../../../../core/services/tags.service';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';

@Component({
  selector: 'app-bills-filter-category',
  templateUrl: './bills-filter-category.component.html',
  styleUrls: ['./bills-filter-category.component.scss'],
})
export class BillsFilterCategoryComponent {

  @Input() categoryList;
  @Input() filters: FilterInterface;

  constructor(private tagsService: TagsService) { }

  setCategory(): void {
    this.filters.categoryList = this.categoryList;
    this.tagsService.filter.next(this.filters);
  }
}
