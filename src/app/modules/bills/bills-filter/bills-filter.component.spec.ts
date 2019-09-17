import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterComponent } from './bills-filter.component';

describe('BillsFilterComponent', () => {
  let component: BillsFilterComponent;
  let fixture: ComponentFixture<BillsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
