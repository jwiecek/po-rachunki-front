import {Component, Input} from '@angular/core';
import {FilterInterface} from '../../../../shared/models/interfaces/filter.interface';
import {TagsService} from '../../../../core/services/tags.service';

@Component({
  selector: 'app-bills-filter-price',
  templateUrl: './bills-filter-price.component.html',
  styleUrls: ['./bills-filter-price.component.scss']
})
export class BillsFilterPriceComponent{

  @Input() filters: FilterInterface;
  public isMobile: boolean;

  constructor(private tagsService: TagsService) { }

  setPrice(): void {
    this.tagsService.filter.next(this.filters);
  }

}
