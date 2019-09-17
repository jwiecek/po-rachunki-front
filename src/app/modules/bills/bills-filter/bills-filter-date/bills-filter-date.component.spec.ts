import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterDateComponent } from './bills-filter-date.component';

describe('BillsFilterDateComponent', () => {
  let component: BillsFilterDateComponent;
  let fixture: ComponentFixture<BillsFilterDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
