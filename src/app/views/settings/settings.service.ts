import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public apiRoot: string;
  public settings: any;
  public apiLaboratorio: string ;
  public apiAnalisis: string;

  constructor(public http: HttpClient) {
    //this.apiRoot = 'https://santacruz-webapp-api.herokuapp.com/';
    this.apiRoot = 'http://localhost:3000/';

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

  getPermisos(): Observable<any> {
    return this.http.get(this.apiRoot + 'permiso/');
  }

  getPermiso(id): Observable<any> {
    return this.http.get(this.apiRoot + 'permiso/' + id);
  }


  editPermiso(permiso): Observable<any> {
    return this.http.put(this.apiRoot + 'permiso/' + permiso.id,permiso);
  }

  deletePermiso(id): Observable<any> {
    return this.http.delete(this.apiRoot + 'permiso/' + id);
  }

  
  addNewPermiso(data): Observable<any>{
    return this.http.post(this.apiRoot + 'permiso',data);
  }

  getSucursales(): Observable<any> {
    return this.http.get(this.apiRoot + 'sucursal/');
  }

  getSucursal(id): Observable<any> {
    return this.http.get(this.apiRoot + 'sucursal/' + id);
  }


  editSucursal(sucursal): Observable<any> {
    return this.http.put(this.apiRoot + 'sucursal/' + sucursal.id,sucursal);
  }

  deleteSucursal(id): Observable<any> {
    return this.http.delete(this.apiRoot + 'sucursal/' + id);
  }

  
  addNewSucursal(data): Observable<any>{
    return this.http.post(this.apiRoot + 'sucursal',data);
  }

  
  getPerfil(id): Observable<any> {
    return this.http.get(this.apiRoot + 'perfil/' + id);
  }


  editPerfil(perfil): Observable<any> {
    return this.http.put(this.apiRoot + 'perfil/' + perfil.id,perfil);
  }

  deletePerfil(id): Observable<any> {
    return this.http.delete(this.apiRoot + 'perfil/' + id);
  }

  
  addNewPerfil(data): Observable<any>{
    return this.http.post(this.apiRoot + 'perfil',data);
  }

  getData(data): Observable<any>{
    return this.http.get(this.apiRoot + 'documento', {params:data})
  }


  getFacturasSucursal(data): Observable<any>{
    return this.http.get(this.apiRoot + 'documento/sucursal', {params:data})
  }


  getDocumentoFactura(data): Observable<any>{
    return this.http.get(this.apiRoot + 'documento/factura', {params:data})
  }

}
