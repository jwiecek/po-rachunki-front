import { Component, Input } from '@angular/core';
import { BillsService } from '../../../core/services/bills.service';
import { ElementView } from '../../../shared/models/interfaces/elementView.interface';

@Component({
  selector: 'app-bills-show-on-list',
  templateUrl: './bills-show-on-list.component.html',
  styleUrls: ['./bills-show-on-list.component.scss']
})
export class BillsShowOnListComponent {

  @Input() elementsView: ElementView;

  constructor(private billsService: BillsService) { }

  setElementView(): void {
    this.billsService.elementsView.next(this.elementsView);
  }
}
