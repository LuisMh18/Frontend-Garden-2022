import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){  }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return true;
    /*return this.authService.validarToken()
                .pipe(
                  tap(error => {
                    console.log("error: ", error);
                    if(error !== false){
                      this.router.navigateByUrl('/auth');                    
                    }
                  })
                )*/
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this.authService.validarToken()
                .pipe(
                  tap(error => {
                    console.log("error::::: ", error);
                    if(error !== false){
                      this.router.navigateByUrl('/auth');                    
                    }
                  })
                )
  }

  /*
  
    canLoad(): Observable<any> | any {
    console.log('canLoad');
    return this.authService.validarToken()
                .subscribe(data => {
                  console.log("data");
                  console.log(data);
                })
  }

  */
}
