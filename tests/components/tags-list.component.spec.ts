import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TagsListComponent} from '../../src/app/modules/tags/tags-list/tags-list.component';
import {Tag} from '../../src/app/shared/models/interfaces/tag.interface';
import {mockedTags} from '../mockedData';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

  const tags: Tag[] = mockedTags;


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

  it('should filter PurchaseType tags', () => {
    expect(component.tagsPurchaseType.length).toEqual(0);
    component.filterTags(tags);
    expect(component.tagsPurchaseType.length).toEqual(4);
  });

  it('should filter product tags', () => {
    expect(component.tagsProduct.length).toEqual(0);
    component.filterTags(tags);
    expect(component.tagsProduct[0].length + component.tagsProduct[1].length + component.tagsProduct[2].length
      + component.tagsProduct[3].length).toEqual(4);
  });

  it('should filter brand tags', () => {
    expect(component.tagsBrand.length).toEqual(0);
    component.filterTags(tags);
    expect(component.tagsBrand[0].length + component.tagsBrand[1].length + component.tagsBrand[2].length +
      component.tagsBrand[3].length).toEqual(1);
  });

  it('should filter shop tags', () => {
    expect(component.tagsShop.length).toEqual(0);
    component.filterTags(tags);
    expect(component.tagsPurchaseType.length).toEqual(4);
    expect(component.tagsShop[0].length + component.tagsShop[1].length + component.tagsShop[2].length +
      component.tagsShop[3].length).toEqual(2);
  });
});

