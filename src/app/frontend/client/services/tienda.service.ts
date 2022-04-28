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

  getProducts(){
    const url = `${this.baseUrl}/tienda`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

      return this.http.get(url, {headers: headers}).pipe(
        map(data => data), catchError(err => of(err))
      );
  }

}
