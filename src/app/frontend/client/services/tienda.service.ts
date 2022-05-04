import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProducts(object:any){

    console.log("object: ", object);

    let params = ``;
   
    if(object !== undefined){

      /* 
      
         const table = "vh_producto_detail";
        let consulta = `SELECT * FROM ${table}`
        let and = "and";
        let cuentaConsulta = 0;

        if(clave !== "" && clave !== undefined){
            consulta = (cuentaConsulta == 0) ? `${consulta} WHERE UPPER(clave) LIKE '%${clave.toUpperCase()}%'` : `${consulta} ${and} UPPER(clave) LIKE '%${clave.toUpperCase()}%'`;  
            cuentaConsulta = 1;
        }

        if(categoria !== "" && categoria !== undefined){
          consulta = (cuentaConsulta == 0) ? `${consulta} WHERE idCategoria=${categoria}` : `${consulta} ${and} idCategoria=${categoria}`;  
          cuentaConsulta = 1;
  }
      
      */

       let cuentaParams = 0;

        if(object.clave){
          params += (cuentaParams == 0) ? `?clave=${object.clave}` : `&clave=${object.clave}`;
          cuentaParams = 1;
        }

        if(object.categoria){
          params += (cuentaParams == 0) ? `?categoria=${object.categoria}` : `&categoria=${object.categoria}`;
          cuentaParams = 1;
        }

        console.log("params: ", params);
        
    } 


    const url = `${this.baseUrl}/tienda/${params}`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

      return this.http.get(url, {headers: headers}).pipe(
        map(data => data), catchError(err => of(err.error))
      );
  }

}
