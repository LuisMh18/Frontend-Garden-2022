import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent {

  public seccion = "Layout";

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout(){

    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }

}
