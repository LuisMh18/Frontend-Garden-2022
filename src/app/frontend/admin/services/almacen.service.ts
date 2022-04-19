import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError, of, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
//import { Almacen } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private baseUrl : string = environment.baseUrl

  constructor(private http: HttpClient) { }


  getData(object?:any) {

    console.log("object");
    console.log(object);    

    let params = ``;
   
    if(object !== undefined){

        if(object.page_limit){
          params += `?page_limit=${object.page_limit}`;
        }

        if(object.current_page){
          params += `&current_page=${object.current_page}`;
        }

        if(object.clave_s){
          params += `&clave=${object.clave_s}`;
        }
        if(object.nombre_s){
          params += `&nombre=${object.nombre_s}`;
        }
        if(object.estatus_s){
          params += `&estatus=${object.estatus_s}`;
        }

        if(object.fecha_inicio != "" && object.fecha_fin == ""){
            params += `&fecha_inicio=${object.fecha_inicio}&fecha_fin=${object.fecha_inicio}`;
        }
    
        if(object.fecha_inicio == "" && object.fecha_fin != ""){
          params += `&fecha_inicio=${object.fecha_fin}&fecha_fin=${object.fecha_fin}`;
        }
    
        if(object.fecha_inicio != "" && object.fecha_fin != ""){
          params += `&fecha_inicio=${object.fecha_inicio}&fecha_fin=${object.fecha_fin}`;
        }

        if(object.order){
          params += `&order=${object.order}`;
        }

        console.log("params: ", params);
        
    } 

    const url = `${this.baseUrl}/almacen${params}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data ), catchError(err => of(err.error))
    );          

  }


  /*agregar(almacen: Object){
    console.log("almacen: ", almacen);
    const url = `${this.baseUrl}/almacen`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.post(url, almacen, {headers: headers});          

  }*/

  agregar(almacen: any):Observable<any>{
    const url = `${this.baseUrl}/almacen`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');
    return this.http.post(url, almacen, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );  

  }

  editar(id:string) {

    const url = `${this.baseUrl}/almacen/${id}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data ), catchError(err => of(err.error))
    );          

  }

  actualizar(id:string, almacen: any):Observable<any>{
    const url = `${this.baseUrl}/almacen/${id}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');
    return this.http.put(url, almacen, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );  

  }

  eliminar(id:string) {

    const url = `${this.baseUrl}/almacen/${id}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.delete(url, {headers: headers}).pipe(
      map(data => data ), catchError(err => of(err.error))
    );          

  }


  /*add(token, data):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

      return this._http.post(this.url+'admin/almacen?token='+token, params, options)
                       .map(res => res.json());
  }*/

  /*agregarHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.url}/heroes`, heroe);
  }*/


}
