import {BillItemComponent} from './bill-item.component';
import Spy = jasmine.Spy;
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {mockedBills} from '../../../../../../tests/mockedData';

describe('BillItemComponent', () => {
  let component: BillItemComponent;
  let httpMock: HttpTestingController;
  let navigateSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BillItemComponent]
    });
    component = TestBed.get(BillItemComponent);
    httpMock = TestBed.get(HttpTestingController);
    navigateSpy = spyOn(TestBed.get(Router), 'navigate');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('BillItemComponent should exist', () => {
    expect(component).toBeDefined();
  });

  it('should navigate to /login', () => {
      component.editBill(mockedBills[0]);
      expect(navigateSpy).toHaveBeenCalledWith(['./edit/', '5']);
    }
  );
});
