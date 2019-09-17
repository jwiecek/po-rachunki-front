import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterWarrantyComponent } from './bills-filter-warranty.component';

describe('BillsFilterWarrantyComponent', () => {
  let component: BillsFilterWarrantyComponent;
  let fixture: ComponentFixture<BillsFilterWarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterWarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
