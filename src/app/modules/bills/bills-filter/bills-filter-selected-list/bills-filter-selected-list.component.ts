import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagsService } from '../../../../core/services/tags.service';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { Tag } from '../../../../shared/models/interfaces/tag.interface';
import { WarrantyOptionsEnum } from '../../../../shared/models/enums/warranty-option.enum';

@Component({
  selector: 'app-bills-filter-selected-list',
  templateUrl: './bills-filter-selected-list.component.html',
  styleUrls: ['./bills-filter-selected-list.component.scss']
})

export class BillsFilterSelectedListComponent {

  @Input() selectedCategoryList: Tag[];
  @Input() filter: FilterInterface;
  @Output() getByFilter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private tagsService: TagsService) { }

  removeFilter(filter, type: string): void {
    switch (type) {
      case 'category':
        const index = this.filter.categoryList.indexOf(filter);
        if (index >= 0) {
          this.filter.categoryList[index].selected = false;
          this.tagsService.filter.next(this.filter);
        }
        break;
      case 'price':
        this.filter.selectedPriceFrom = null;
        this.filter.selectedPriceTo = null;
        this.tagsService.filter.next(this.filter);
        break;
      case 'purchaseDate':
        this.filter.purchaseDateFrom = null;
        this.filter.purchaseDateTo = null;
        this.tagsService.filter.next(this.filter);
        break;
      case 'warranty':
        this.filter.selectedWarranty = WarrantyOptionsEnum.NONE;
        this.filter.warrantyFrom = null;
        this.filter.warrantyTo = null;
        this.tagsService.filter.next(this.filter);
        break;
    }
    this.getByFilter.emit();
  }

}
