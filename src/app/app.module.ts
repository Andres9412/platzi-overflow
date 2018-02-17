import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';


//Angular material
import {MaterialModule} from './material.module';

//third-party bookstore
import 'hammerjs';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { QuestionDetailsComponent } from './question/question-details/question-details.component';
import { AsnwerFormComponent } from './answer/asnwer-form/asnwer-form.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';

//Routs
import {Routing} from './app.routing';

//services
import {QuestionService} from './question/question.service';
import {AuthService} from './auth/auth.service';
import { QuestionComponent } from './question/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailsComponent,
    AsnwerFormComponent,
    SigninComponent,
    SignupComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule
  ],
  providers: [
    QuestionService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
