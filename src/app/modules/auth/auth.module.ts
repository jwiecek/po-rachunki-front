import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from '../../core/services/auth.service';
import {AuthRoutingModule} from './auth-routing.module';


@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService]
})
export class AuthModule {}
