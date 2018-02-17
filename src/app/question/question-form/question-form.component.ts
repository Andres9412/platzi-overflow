import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Question} from '../question.model';
import {QuestionService} from '../question.service';
import { Router } from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import icons from './icons';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  icons: Object[] = icons;

  constructor(
    private _questionService:QuestionService,
    private router: Router,
    private _authService:AuthService
  ) { }

  ngOnInit() {
    if (!this._authService.isLoggedIn()) {
        this.router.navigateByUrl('/Signin');
    }
  }

  getVersion(icon){
    let version;
    if(icon.versions.font.includes('plain-wordmark')){
      version = 'plain-wordmark';
    }else{
      version = icon.versions.font[0];
    }
    return version;
  }

  onSubmit(form: NgForm) {
    const q = new Question(
      form.value.title,
      form.value.description,
      new Date(),
      form.value.icon
    );

    this._questionService.addQuestion(q)
      .subscribe(
        ({ _id }) => this.router.navigate(['/Questions', _id]),
        this._authService.handleError
      );
    form.resetForm();
  }

}
