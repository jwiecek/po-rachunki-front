import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../shared/models/interfaces/auth.interface';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService, public router: Router) {}

  onLogin(form: NgForm) {
    const userData: User = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(userData).subscribe(res => {
      if (res.token) {
        this.router.navigate(['/']);
      }
    });
  }

}
