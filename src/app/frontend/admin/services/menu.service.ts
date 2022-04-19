import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getMenu() {


    const url = `${this.baseUrl}/menu`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get(url, {headers: headers}).pipe(
      map(data => data ), catchError(err => of(err.error))
    );

    /*return this.http.get(url, {headers: headers}).pipe(
      map(data => {
        console.log("---get data menu---");
        console.log(data);
        return data;
      }), catchError(err => of(err.error))
    );*/
                  

  }



}
