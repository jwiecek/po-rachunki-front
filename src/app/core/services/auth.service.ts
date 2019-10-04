import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/interfaces/auth.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private isAuthenticated = false;
  private token: string;
  public userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(userData: User) {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }

  login(userData: User) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, userData).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.token = user.token;
          this.userId = user.userId;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
        return user;
      })
    );
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }
}
