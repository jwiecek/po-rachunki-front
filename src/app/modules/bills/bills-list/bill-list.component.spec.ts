import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BillsListComponent} from './bills-list.component';
import {BillsFilterSelectedListComponent} from '../bills-filter/bills-filter-selected-list/bills-filter-selected-list.component';
import {BillItemComponent} from './bill-item/bill-item.component';
import {MatCardModule, MatChipsModule, MatIconModule} from '@angular/material';
import {BillsService} from '../../../core/services/bills.service';
import {TagsService} from '../../../core/services/tags.service';
import {ToolbarComponent} from '../bills-filter/toolbar/toolbar.component';

describe('BillListComponent', () => {
  let component: BillsListComponent;
  let fixture: ComponentFixture<BillsListComponent>;
  let billsService: BillsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillsListComponent, BillsFilterSelectedListComponent, BillItemComponent, ToolbarComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
        MatChipsModule, MatCardModule
      ],
    providers: [BillsService, TagsService]});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsListComponent);
    component = fixture.componentInstance;
    billsService = TestBed.get(BillsService);
    fixture.detectChanges();
  });

  it('should create tags', () => {
    expect(component).toBeDefined();
  });

  it('should called function getBills onInit', () => {
    spyOn(component, 'getBills');
    component.ngOnInit();
    expect(component.getBills).toHaveBeenCalled();
  });

  it('should called function getBillss onInit', () => {
    component.ngOnInit();
    expect(component.getBills).toHaveBeenCalled();
  });

});

