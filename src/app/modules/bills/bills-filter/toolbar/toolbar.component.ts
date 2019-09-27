import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { FilterInterface } from '../../../../shared/models/interfaces/filter.interface';
import { WarrantyOptionsEnum } from '../../../../shared/models/enums/warranty-option.enum';
import { TagsService } from '../../../../core/services/tags.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Output() onViewByWarranty: EventEmitter<void> = new EventEmitter<void>();
  public filter: FilterInterface;

  constructor(private tagsService: TagsService, private bottomSheet: MatBottomSheet) {}

  changeView(): void {
    // this.bottomSheet.open(ChangeViewDialogComponent);
  }

  changeViewByWarranty(): void {
    this.filter.selectedWarranty = WarrantyOptionsEnum.END_IN_ONE_MONTH;
    this.filter.selectedPriceFrom = null;
    this.filter.selectedPriceTo = null;
    this.filter.purchaseDateFrom = null;
    this.filter.purchaseDateTo = null;
    this.filter.categoryList.forEach(category => (category.selected = false));
    this.tagsService.filter.next(this.filter);
    this.onViewByWarranty.emit();
  }

  showFilterOption(): void {
    const bottomSheet = this.bottomSheet.open(FilterDialogComponent);
    bottomSheet.afterDismissed().subscribe(() => {
    });
  }
}
