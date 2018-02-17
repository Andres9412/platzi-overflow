import { Injectable } from '@angular/core';
import { Question } from './question.model';
import {Answer} from '../answer/asnwer-form/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';
// import urljoin = require('url-join');
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class QuestionService {

  private questionsUrl:string;

  constructor( private http:Http ) {
    this.questionsUrl = urljoin(environment.apiUrl,'questions')
  }

  // getQuestions(): Promise< void | Question[]>{
  //   return this.http.get(this.questionUrl)
  //     .toPromise()
  //     .then(res => res.json() as Question[])
  //     .catch(this.handleError)
  // }

  getQuestions(sort = '-createdAt'){
    return this.http.get(`${this.questionsUrl}?sort=${sort}`)
      .map((res)=> res.json() as Question[] )
  }

  getQuestion(id): Promise<void | Question>{
    const url = urljoin(this.questionsUrl,id);
    return this.http.get(url)
      .toPromise()
      .then(res=> res.json() as Question)
      .catch(this.handleError);
  }
  getToken(){
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }
  addQuestion(question:Question){
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // console.log(question)
    const url = this.questionsUrl + this.getToken();
    return this.http.post(url,body,{ headers })
      .map((res: Response) => res.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }
  addAnswer(answer:Answer){
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    }
    const body = JSON.stringify(a);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const url = urljoin(this.questionsUrl, answer.question._id.toString(), 'answers');
    const token = this.getToken();
    return this.http.post(url + token,body,{ headers })
      .map((res: Response) => res.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }

  handleError(error:any){
    const errorMsg = error.message ? error.message :
      error.status ? `${error.status}-${error.statusText}` : 'server error';
    console.log(errorMsg)
  }
}
