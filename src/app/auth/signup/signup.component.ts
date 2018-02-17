import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  hideCheck = true;
  passwordNotCheck = false;
  signUpForm:FormGroup;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null,[Validators.required]),
      lastName: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl(null,[Validators.required]),
      passwordCheck: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    //
    if(this.signUpForm.valid && this.signUpForm.value.password == this.signUpForm.value.passwordCheck ){
      const{firstName,lastName,email,password} = this.signUpForm.value;
      const user = new User(email,password,firstName,lastName)
      this._authService.signup(user)
        .subscribe(
          this._authService.login,
          this._authService.handleError
        );
      this.passwordNotCheck = false;
    }
    if(this.signUpForm.valid && this.signUpForm.value.password != this.signUpForm.value.passwordCheck){
      this.passwordNotCheck = true;
    }
  }

}
