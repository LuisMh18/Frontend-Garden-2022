import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl : string = environment.baseUrl; 

  constructor(private http: HttpClient) { }

  getData(object?:any){

    let params = ``;
   
    if(object !== undefined){

        if(object.page_limit){
          params += `?page_limit=${object.page_limit}`;
        }

        if(object.current_page){
          params += `&current_page=${object.current_page}`;
        }

        if(object.usuario_s){
          params += `&usuario=${object.usuario_s}`;
        }

        if(object.rol_id_s){
          params += `&rol_id=${object.rol_id_s}`;
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

    const url = `${this.baseUrl}/usuarios/${params}`;

    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem("token") || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );

  }


  editar(id:number){
    const url = `${this.baseUrl}/usuarios/${id}`;
    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem("token") || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );
  }


  agregar(usuario:any):Observable<any>{
    const url = `${this.baseUrl}/usuarios`;

    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem("token") || '');

    return this.http.post(url, usuario, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );

  }

  actualizar(id:number, usuario:any):Observable<any>{
    const url = `${this.baseUrl}/usuarios/${id}`;
    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem("token") || '');

      return this.http.put(url, usuario, {headers: headers}).pipe(
        map(data => data), catchError(err => of(err.error))
      );
  }

  eliminar(id:number){
    const url =  `${this.baseUrl}/usuarios/${id}`;
    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem("token") || '');

      return this.http.delete(url, {headers: headers}).pipe(
        map(data => data), catchError(err => of(err.error))
      );
  }


  getDataAll(){
    const url = `${this.baseUrl}/usuarios/getData/all`;
    const headers = new HttpHeaders()
                        .set('x-auth-token', localStorage.getItem("token") || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );
  }

}
