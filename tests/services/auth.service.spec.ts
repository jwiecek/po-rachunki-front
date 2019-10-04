import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../src/app/core/services/auth.service';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import Spy = jasmine.Spy;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let navigateSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    navigateSpy = spyOn(TestBed.get(Router), 'navigate'); // <= init spy
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('AuthService should exist', () => {
    expect(service).toBeDefined();
  });

  it('should remove current user from localStorage', () => {
      localStorage.setItem('currentUser', '1234');
      service.logout();
      expect(localStorage.getItem('currentUser')).toBeNull();
    }
  );

  it('should navigate to /login', () => {
    service.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    }
  );
});
