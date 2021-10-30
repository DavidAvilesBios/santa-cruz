import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class LoginService {
  public apiRoot: string;
  public settings: any;
  public apiLaboratorio: string ;
  public apiAnalisis: string;

  constructor(public http: HttpClient) {
    this.apiRoot = 'https://santacruz-webapp-api.herokuapp.com/';

  }

   postLogin(data){
      return this.http.post(this.apiRoot + 'login',data);
   }


}
