import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
//import { TotalesInventario } from '../interfaces/totalesinventario.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getData(object:any){

    //console.log("object: ", object);

    let params = ``;
   
    if(object.tipo){
      params += `?tipo=${object.tipo}`;
    }

    if(object.tipo == 'mes'){
        object.mes_anio = moment(object.mes_anio).format("YYYY-MM-DD");
        params += `&fecha=${object.mes_anio}`;
    } else if(object.tipo == 'anio'){
        object._anio = moment(object._anio).format("YYYY-MM-DD");
        params += `&fecha=${object._anio}`;
    } else {
      object.fecha_inicio = moment(object.fecha_inicio).format("YYYY-MM-DD");
      params += `&fecha=${object.fecha_inicio}`;
    }
    

    if(object.fecha_fin){
      object.fecha_fin = moment(object.fecha_fin).format("YYYY-MM-DD");
      params += `&fechaFin=${object.fecha_fin}`;
    }
    console.log("params: ", params);


    const url = `${this.baseUrl}/dashboard${params}`;
    const headers = new HttpHeaders()
                    .set('x-auth-token', localStorage.getItem('token') || '');

    //return this.http.get<TotalesInventario>(url, {headers: headers}).pipe(
    return this.http.get(url, {headers: headers}).pipe(  
     map(data => data), catchError(err => of(err.error))
    );


  }


  getInventario(id:number){
    const url = `${this.baseUrl}/dashboard/getInventario/${id}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');
  
                  
      return this.http.get(url, {headers: headers}).pipe(
        map(data => data), catchError(err => of(err.error))
      );
  }


}
