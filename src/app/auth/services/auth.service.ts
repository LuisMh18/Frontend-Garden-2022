import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _usuario?: any;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }


  login(email: string, password: string){

    const url = `${this.baseUrl}/auth`;
    const body = {email, password}; 

    return this.http.post<AuthResponse>(url, body)      
                .pipe(
                  tap(resp => {
                    //console.log(resp);
                    if(resp.error === false){
                      this._usuario = {
                        id: resp.usuario.id,
                        usuario: resp.usuario.usuario,
                        email: resp.usuario.email,
                        rol: resp.usuario.nombreRol
                      }
                    }
                  }),
                  map(resp =>  resp ),
                  catchError(err => of(err.error))
                )

  }

  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renovarToken`;
    const headers = new HttpHeaders()
                  .set('x-auth-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers: headers})
                .pipe(
                  map(resp => {
                    console.log("resprespresp: ", resp);
                    localStorage.setItem('token', resp.token!);
                    this._usuario = {
                      id: resp.usuario.id,
                      usuario: resp.usuario.usuario,
                      email: resp.usuario.email,
                      rol: resp.usuario.nombreRol
                    }
                    return resp.error;
                  }),
                  catchError(err => of(err.error))
                )

  }


  logout() {
    localStorage.clear();
  }


}
