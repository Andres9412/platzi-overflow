import { Component, OnInit, OnDestroy } from '@angular/core';
import {Question} from '../question.model';
import { ActivatedRoute } from '@angular/router';
import {QuestionService} from '../question.service';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit, OnDestroy  {
  question?:Question ;
  loading = true;
  subs:any;

  constructor(private _activeRouter:ActivatedRoute,
              private _questionService:QuestionService) {

  }

  ngOnInit() {
    this.subs = this._activeRouter.params.subscribe(params => {
      this._questionService
        .getQuestion(params.id)
        .then((question:Question)=>{
          this.question = question;
          this.loading = false;
          // console.log(params.id)
          // console.log(this.question)
        });
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
