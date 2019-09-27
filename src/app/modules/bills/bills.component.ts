import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BillsService} from '../../core/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  public isMobile: boolean;
  public resultCount: Observable<number>;

  constructor(private billsService: BillsService) { }

  ngOnInit() {
    this.onResize();
    this.resultCount = this.billsService.currentResultCount;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

}
