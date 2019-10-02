import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../src/app/shared/material.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HeaderComponent} from '../../src/app/core/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  // it('should trigger the navigation to `/tags`', async(() => {
  //   const link = fixture.debugElement.nativeElement.querySelector('.toolbar__button--tags');
  //
  //   link.click();
  //
  //   expect(router.navigateByUrl).toHaveBeenCalled();
  // }));
});
