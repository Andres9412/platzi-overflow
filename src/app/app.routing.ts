import {Routes,RouterModule} from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionComponent } from './question/question/question.component';
import { QUESTION_ROUTER } from './question/question.routing';


const APP_ROUTER: Routes =[
  {path: '', component: QuestionComponent},
  {path: 'Signin', component: SigninComponent},
  {path: 'Signup', component: SignupComponent},
  {path: 'Questions', children:QUESTION_ROUTER},

]
export const Routing =RouterModule.forRoot(APP_ROUTER);
