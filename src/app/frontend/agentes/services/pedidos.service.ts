import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseurl = environment.baseUrl;

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

        if(object.npedido_s){
          params += `&num_pedido=${object.npedido_s}`;
        }

        if(object.cliente_s){
          params += `&nombre_cliente=${object.cliente_s}`;
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

    const url = `${this.baseurl}/agentes/${params}`;
    const headers = new HttpHeaders()
                        .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err))
    );
  }


  getDataAll(){
    const url = `${this.baseurl}/agentes/getData/all`;
    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data), catchError(err => of(err))
    );
  }


}
