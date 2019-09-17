import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsShowOnListComponent } from './bills-show-on-list.component';

describe('BillsShowOnListComponent', () => {
  let component: BillsShowOnListComponent;
  let fixture: ComponentFixture<BillsShowOnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsShowOnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsShowOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
