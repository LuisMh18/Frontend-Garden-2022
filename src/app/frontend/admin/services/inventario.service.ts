import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

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
        if(object.pedimento){
          params += `&num_pedimento=${object.pedimento}`;
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

    const url = `${this.baseUrl}/inventario${params}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data ), catchError(err => of(err.error))
    );          

  }


  getDataAll(){
    const url = `${this.baseUrl}/inventario/getData/all`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err.error))
    );
  }




}
