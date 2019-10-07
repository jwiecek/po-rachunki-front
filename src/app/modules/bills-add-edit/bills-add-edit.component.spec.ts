import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {mockedTags} from '../../../../tests/mockedData';
import {Tag} from '../../shared/models/interfaces/tag.interface';
import {BillsAddEditComponent} from './bills-add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {mockedBills} from '../../../../tests/mockedData';


describe('BillsAddEditComponent', () => {
  let component: BillsAddEditComponent;
  let fixture: ComponentFixture<BillsAddEditComponent>;
  const tags: Tag[] = mockedTags;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [BillsAddEditComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatDatepickerModule],

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create tags', () => {
    expect(component).toBeDefined();
  });

  it('should filter PurchaseType tags', () => {
    expect(component.tagsPurchaseType).toBeUndefined();
    component.filterTags(tags);
    expect(component.tagsPurchaseType.length).toEqual(4);
  });

  it('should filter product tags', () => {
    expect(component.tagsProduct).toBeUndefined();
    component.filterTags(tags);
    expect(component.tagsProduct.length).toEqual(4);
  });

  it('should filter brand tags', () => {
    expect(component.tagsBrand).toBeUndefined();
    component.filterTags(tags);
    expect(component.tagsBrand.length).toEqual(1);
  });

  it('should filter shop tags', () => {
    expect(component.tagsShop).toBeUndefined();
    component.filterTags(tags);
    expect(component.tagsShop.length).toEqual(2);
  });

  it('should filter product tags by type', () => {
    expect(component.tagsProductByType).toBeUndefined();
    component.selectedPurchaseTypes = 'Elektronika';
    component.filterTags(tags);
    expect(component.tagsProductByType).toBeUndefined();
    component.groupTagsBySelectedPurchaseTypes();
    expect(component.tagsProductByType.length).toEqual(2);
    component.selectedPurchaseTypes = 'Moda';
    component.groupTagsBySelectedPurchaseTypes();
    expect(component.tagsProductByType.length).toEqual(1);
  });

  it('should get selected warranty', () => {
    expect(component.selectedWarrantyMonth).toBeUndefined();
    component.selectedWarranty(5);
    expect(component.selectedWarrantyMonth).toEqual(5);
  });

  it('should change selected bill properties', () => {
    component.tags = tags;
    component.filterTags(tags);
    component.getSelectedBill(mockedBills[0]);
    expect(component.selectedPurchaseTypes).toEqual('Elektronika');
    expect(component.imageBillPath).toEqual('3cde8b107299473d4c102b7c22b6a2e37d.jpg');
    expect(component.selectedWarrantyMonth).toEqual(180);
    expect(component.selectedWarrantyLabel).toEqual(37);
    expect(component.selectedProducts).toEqual(['Aparat']);
    expect(component.selectedBrands).toEqual(['Nikon']);
    expect(component.selectedShops).toEqual(['Media Markt']);
    expect(component.selectedBillPhotoUrl).toBeDefined();
  });

  it('should select correct tag', () => {
    component.tags = tags;
    component.filterTags(tags);
    component.selectTag(mockedTags[2], false);
    expect(component.selectedPurchaseTypes).toEqual('Elektronika');
    component.selectTag(mockedTags[4], true);
    expect(component.selectedProducts).toEqual(['lampa']);
    component.selectTag(mockedTags[10], true);
    expect(component.selectedBrands).toEqual(['Sony']);
  });

  it('should defined billForm onInit', () => {
    component.ngOnInit();
    expect(component.billForm).toBeDefined();
  });

});

