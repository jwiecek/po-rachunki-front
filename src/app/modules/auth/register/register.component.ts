import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/interfaces/auth.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user: User = { email: form.value.email, password: form.value.password };
    this.authService.registerUser(user).subscribe(res => {
      console.log(res);
      if (res) {
        this.authService.login(user).subscribe(userData => {
          if (userData.token) {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
}
