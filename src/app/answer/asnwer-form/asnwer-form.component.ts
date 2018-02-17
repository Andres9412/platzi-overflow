import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { User } from '../../auth/user.model';
import { Question } from '../../question/question.model';
import {QuestionService} from '../../question/question.service';
import {AuthService} from '../../auth/auth.service';
import { Router } from '@angular/router';
import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-asnwer-form',
  templateUrl: './asnwer-form.component.html',
  styleUrls: ['./asnwer-form.component.css']
})
export class AsnwerFormComponent implements OnInit {

  sweetScroll:SweetScroll;

  constructor(
    private _questionService:QuestionService,
    private _authService: AuthService,
    private router: Router
  ) {
    // this.sweetScroll = new SweetScroll()
  }

  ngOnInit() {

  }
  @Input() question : Question;
  onSubmit(form:NgForm ){
    if(!this._authService.isLoggedIn()){
      this.router.navigateByUrl('/Signin')
    }
   const answer= new Answer(
     form.value.answer,
     this.question,
     new Date,
     new User(null,null,'pablo','picapiedra')
   )

   this._questionService.addAnswer(answer).subscribe(
     a => {
       this.question.answers.unshift(a);
       // this.sweetScroll.to('#title');
     },
     this._authService.handleError
   );
   form.reset();

  }
}
