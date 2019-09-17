import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterPriceComponent } from './bills-filter-price.component';

describe('BillsFilterPriceComponent', () => {
  let component: BillsFilterPriceComponent;
  let fixture: ComponentFixture<BillsFilterPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
