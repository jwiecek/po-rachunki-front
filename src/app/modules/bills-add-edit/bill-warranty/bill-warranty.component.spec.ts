import {BillWarrantyComponent} from './bill-warranty.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material';

describe('BillWarrantyComponent', () => {
  let component: BillWarrantyComponent;
  let httpMock: HttpTestingController;
  let el: DebugElement;
  let fixture: ComponentFixture<BillWarrantyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSliderModule],
      providers: [BillWarrantyComponent],
      declarations: [BillWarrantyComponent]
    });
    component = TestBed.get(BillWarrantyComponent);
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(BillWarrantyComponent);
    el = fixture.debugElement.query(By.css('mat-slider-thumb-label-text'));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('BillWarrantyComponent should exist', () => {
    expect(component).toBeDefined();
  });

  it('should return correct selected warranty label, time and month', () => {
    component.selectedWarrantyLabel = 0;
    component.selectedWarrantyMonth = 0;
    component.selectedWarrantyValue = 1;
    component.changeWarrantyValue();
    expect(component.selectedWarrantyLabel).toEqual(1);
    expect(component.selectedWarrantyMonth).toEqual(1);
    expect(component.time).toBe('miesiąc');
    component.selectedWarrantyValue = 2;
    component.changeWarrantyValue();
    expect(component.time).toBe('miesiące');
    component.selectedWarrantyValue = 7;
    component.changeWarrantyValue();
    expect(component.time).toBe('miesięcy');
    component.selectedWarrantyValue = 25;
    component.changeWarrantyValue();
    expect(component.time).toBe('lata');
    expect(component.selectedWarrantyLabel).toEqual(3);
    expect(component.selectedWarrantyMonth).toEqual(36);
    component.selectedWarrantyValue = 55;
    component.changeWarrantyValue();
    expect(component.time).toBe('');
    expect(component.selectedWarrantyLabel).toEqual('dożywotnio');
    expect(component.selectedWarrantyMonth).toEqual(396);
  });

  it('should return correct selected warranty value', () => {
    component.getSelectedWarrantyValue();
    expect(component.selectedWarrantyValue).toEqual(0);
    component.selectedWarrantyMonth = 66;
    component.getSelectedWarrantyValue();
    expect(component.selectedWarrantyValue).toEqual(27.5);
    component.selectedWarrantyMonth = 6;
    component.getSelectedWarrantyValue();
    expect(component.selectedWarrantyValue).toEqual(6);
  });
});
