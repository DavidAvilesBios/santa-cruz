import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class SettingsService {
  public apiRoot: string;
  public settings: any;
  public apiLaboratorio: string ;
  public apiAnalisis: string;

  constructor(public http: HttpClient) {
    this.apiRoot = 'https://santacruz-webapp-api.herokuapp.com/';

  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiRoot + 'usuario');
  }

  
  getUser(id): Observable<any> {
    return this.http.get(this.apiRoot + 'usuario/' + id);
  }

  getPermissions(): Observable<any> {
    return this.http.get(this.apiRoot + 'perfil');
  }

  addNewUsuario(data): Observable<any>{
    return this.http.post(this.apiRoot + 'usuario',data);
  }

  editUser(user): Observable<any> {
    return this.http.put(this.apiRoot + 'usuario/' + user.id,user);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.apiRoot + 'usuario/' + id);
  }


}
