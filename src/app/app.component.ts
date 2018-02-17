import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private _authService: AuthService ) {}

  islogged(){
    return this._authService.isLoggedIn()
  }
  fullName() {
    return this._authService.currentUser.fullName();
  }
  logout(){
    this._authService.logout()
  }

}
