import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterCategoryComponent } from './bills-filter-category.component';

describe('BillsFilterCategoryComponent', () => {
  let component: BillsFilterCategoryComponent;
  let fixture: ComponentFixture<BillsFilterCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
