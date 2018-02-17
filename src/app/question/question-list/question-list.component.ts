import { Component, OnInit, Input } from '@angular/core';
import {Question} from '../question.model';
import {QuestionService} from '../question.service';



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})

export class QuestionListComponent implements OnInit {

  @Input() sort = '-createdAt';
  questions:Question[];
  loading:boolean = true;

  constructor( private _questionService:QuestionService) { }

  ngOnInit() {
    // this._questionService
    //   .getQuestions()
    //   .then((question:Question[])=>{
    //     this.questions = question;
    //     this.loading=false
    //   });

    this._questionService
      .getQuestions(this.sort)
      .subscribe((question:Question[])=>{
        this.questions = question;
        this.loading=false
      });

  }

}
