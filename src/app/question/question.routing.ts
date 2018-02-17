import {QuestionComponent} from './question/question.component';
import {QuestionDetailsComponent} from './question-details/question-details.component';
import {QuestionFormComponent} from './question-form/question-form.component';



export const QUESTION_ROUTER =[
  {path: '', component: QuestionComponent},
  {path: 'new', component: QuestionFormComponent},
  {path: ':id', component: QuestionDetailsComponent},


]
