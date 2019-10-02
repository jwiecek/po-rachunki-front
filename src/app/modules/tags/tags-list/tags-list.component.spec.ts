import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TagsListComponent} from './tags-list.component';
import {Tag} from '../../../shared/models/interfaces/tag.interface';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

  const tags: Tag[] = [
    {belongToLabel: [], createdById: '5cde6a1561298b08dea45d58', label: 'Dom i ogród', type: 'purchaseType', _id: '1'},
    {belongToLabel: [], createdById: '5cde6a1561298b08dea45d58', label: 'Dziecko', type: 'purchaseType', _id: '2'},
    {belongToLabel: [], createdById: '5cde6a1561298b08dea45d58', label: 'Elektronika', type: 'purchaseType', _id: '31'},
    {belongToLabel: [], createdById: '5cde6a1561298b08dea45d58', label: 'Moda', type: 'purchaseType', _id: '41'},

    {belongToLabel: ['Elektronika'], createdById: '5cde6a1561298b08dea45d58', label: 'lampa', type: 'product', _id: '3'},
    {belongToLabel: ['Elektronika'], createdById: '5cde6a1561298b08dea45d58', label: 'Telewizor', type: 'product', _id: '4'},
    {belongToLabel: ['Moda'], createdById: '5cde6a1561298b08dea45d58', label: 'Buty', type: 'product', _id: '5'},
    {belongToLabel: ['Dziecko'], createdById: '5cde6a1561298b08dea45d58', label: 'Domek', type: 'product', _id: '6'},

    {belongToLabel: ['Dziecko'], createdById: '5cde6a1561298b08dea45d58', label: 'Mama i ja', type: 'shop', _id: '7'},
    {belongToLabel: ['Dom i ogród'], createdById: '5cde6a1561298b08dea45d58', label: 'Agata Meble', type: 'shop', _id: '8'},

    {belongToLabel: ['Elektronika'], createdById: '5cde6a1561298b08dea45d58', label: 'Sony', type: 'brand', _id: '9'},
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagsListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create tags', () => {
    expect(component).toBeDefined();
  });

  it('should filter tags in groups', () => {
    expect(component.tagsPurchaseType.length).toEqual(0);
    expect(component.tagsProduct.length).toEqual(0);
    expect(component.tagsBrand.length).toEqual(0);
    expect(component.tagsShop.length).toEqual(0);
    component.filterTags(tags);
    expect(component.tagsPurchaseType.length).toEqual(4);
    expect(component.tagsProduct[0].length + component.tagsProduct[1].length + component.tagsProduct[2].length
      + component.tagsProduct[3].length).toEqual(4);
    expect(component.tagsBrand[0].length + component.tagsBrand[1].length + component.tagsBrand[2].length +
      component.tagsBrand[3].length).toEqual(1);
    expect(component.tagsShop[0].length + component.tagsShop[1].length + component.tagsShop[2].length +
      component.tagsShop[3].length).toEqual(2);
  });
});

