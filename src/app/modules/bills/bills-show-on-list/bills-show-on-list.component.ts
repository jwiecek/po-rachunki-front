import {Component, Input, OnInit} from '@angular/core';
import {BillsService} from '../../../core/services/bills.service';

@Component({
  selector: 'app-bills-show-on-list',
  templateUrl: './bills-show-on-list.component.html',
  styleUrls: ['./bills-show-on-list.component.scss']
})
export class BillsShowOnListComponent implements OnInit {

  @Input() elementsView;

  constructor(private billsService: BillsService) { }

  ngOnInit() {
  }

  setElementView(): void {
    this.billsService.elementsView.next(this.elementsView);
  }

}
