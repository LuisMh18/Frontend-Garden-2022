import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {


  miFormulario: FormGroup = this.fb.group({
    email: ['admin@outlook.es', [Validators.required, Validators.email]],
    password: ['admin99', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) { }

  login() {
    //console.log(this.miFormulario.value);
    //console.log(this.miFormulario.valid);

    const {email, password} = this.miFormulario.value;

    this.authService.login(email, password)
          .subscribe(resp => {
            console.log("respuesta: ", resp);
            if(resp.error === false){
              localStorage.setItem('token', resp.token!);
              localStorage.setItem('usuario', JSON.stringify(resp.usuario)!);
              this.router.navigateByUrl('/admin/dashboard');
            } else {
              //mostrar mensaje de error
              console.log(resp.msg)

              Swal.fire(
                'Error',
                resp.msg,
                'error'
              )

            }
      
          });

    

  }
  

 
}
