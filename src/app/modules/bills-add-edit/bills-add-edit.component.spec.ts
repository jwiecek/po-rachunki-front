import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsAddEditComponent } from './bills-add-edit.component';

describe('BillsAddEditComponent', () => {
  let component: BillsAddEditComponent;
  let fixture: ComponentFixture<BillsAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
