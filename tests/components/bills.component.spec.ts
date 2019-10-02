import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BillsComponent} from '../../src/app/modules/bills/bills.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BillsFilterComponent} from '../../src/app/modules/bills/bills-filter/bills-filter.component';
import {BillsListComponent} from '../../src/app/modules/bills/bills-list/bills-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../src/app/shared/material.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillsComponent, BillsFilterComponent, BillsListComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should trigger the navigation to `/create`', async(() => {
    const link = fixture.debugElement.nativeElement.querySelector('.bills__button--create');

    link.click();

    expect(router.navigateByUrl).toHaveBeenCalled();
  }));
});
