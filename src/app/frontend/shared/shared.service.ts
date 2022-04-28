import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

    /**Paginación*/
    current_page:number = 1;

    pages!:any;
    //pagination!:any;
    previousPage!:any;
    nextPage! : any;
    currentPage!:number;
    totalregistros!:number;
    infoResultados!:string;
    dataAlmacen: any[] = [];
    
  

  constructor(private messageService: MessageService, 
             private router: Router, 
             private authService: AuthService) { }


  msg(type:string, textHeader:string, msg:string){

    this.messageService.add({severity:type, summary:textHeader, detail:msg});
    
  }

  validarCampos(controls:any){
      for (const field in controls.controls) { // 'field' is a string
        //console.log("field:" + field);

        const control = controls.get(field); // 'control' is a FormControls);

          if(control?.errors?.['required']){
            //console.log('error', `El campo ${field} es requerido.`);
            if(field == "password"){
              this.msg('error', 'Error', `El campo contraseña es requerido.`);
            } else if(field == "password_confirm"){
              this.msg('error', 'Error', `El campo repetir contraseña es requerido.`);
            } else if(field == "old_password"){
              this.msg('error', 'Error', `El campo contraseña anterior es requerido.`);
            } else if(field == "new_password"){
              this.msg('error', 'Error', `El campo nueva contraseña es requerido.`);
            } else if(field == "new_password_confirm"){
              this.msg('error', 'Error', `El campo repetir nueva contraseña es requerido.`);
            } else {
              this.msg('error', 'Error', `El campo ${field} es requerido.`);
            }
            

          }
    
          if(control?.errors?.['minlength']){ 
            //console.log('error', `El campo ${field} debe de tener al menos 3 caracteres.`);
            if(field == "password"){
              this.msg('error', 'Error', `El campo contraseña debe de tener al menos 3 caracteres.`);
            } else if(field == "password_confirm"){
              this.msg('error', 'Error', `El campo repetir contraseña debe de tener al menos 3 caracteres.`);
            } else if(field == "old_password"){
              this.msg('error', 'Error', `El campo contraseña anterior debe de tener al menos 3 caracteres.`);
            } else if(field == "new_password"){
              this.msg('error', 'Error', `El campo nueva contraseña debe de tener al menos 3 caracteres.`);
            } else if(field == "new_password_confirm"){
              this.msg('error', 'Error', `El campo repetir nueva contraseña debe de tener al menos 3 caracteres.`);
            } else {
              this.msg('error', 'Error', `El campo ${field} debe de tener al menos 3 caracteres.`);
            }
            
          }
          if(control?.errors?.['email']){ 
            //console.log('error', `El formato del ${field} es inválido.`);
            this.msg('error', 'Error', `El formato del ${field} es inválido.`);
          
          }
        //} 

        /*if(control?.status == 'INVALID'){
          return;
        }*/
      
    }

    return controls;
  }


  removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  exportCsv(data:object, titulo:string, headers:object){
    var options = { 
      headers: headers,
    };

    new AngularCsv(data, titulo, options);

  }


  
  mostrarResultados(data:any){

    this.currentPage = data.currentPage;
    this.nextPage = data.nextPage;

    this.totalregistros = data.total;
    let totalpaginas = data.limit;

    let inicio  = 0;
    let fin = 0;

    inicio = (this.currentPage * totalpaginas) - totalpaginas;

    (inicio == 0) ? inicio = 1 : inicio = inicio; 

    fin = (this.nextPage == null) ? fin = this.totalregistros : fin = (this.currentPage * totalpaginas);


    this.infoResultados = `Mostrando del ${inicio} a ${fin} (Total: ${this.totalregistros} resultados)`;

    console.log("this.infoResultados: ", this.infoResultados);
    return {
      infoResultados: this.infoResultados,
    }


  }

  /*generarPaginacion(data:any){

    console.log("****data*****");
    console.log(data);
    
    this.dataAlmacen = data.data;

    this.previousPage = data.previousPage;
    this.currentPage = data.currentPage;
    this.nextPage = data.nextPage;

    this.totalregistros = data.total;
    let totalpaginas = data.limit;


    let inicio  = 0;
    let fin = 0;

    inicio = (this.currentPage * totalpaginas) - totalpaginas;

    (inicio == 0) ? inicio = 1 : inicio = inicio; 

    fin = (this.nextPage == null) ? fin = this.totalregistros : fin = (this.currentPage * totalpaginas);


    this.infoResultados = `Mostrando del ${inicio} a ${fin} (Total: ${this.totalregistros} resultados)`;


    let i = 0;//variable para comprobar el total de paginas a mostrar
    this.pages = [];
    let cp = 0; //variable para contar las paginas(si hay al menos un registro siempre debe de existir al menos una página)
    while (i <= this.totalregistros) { //la condición es que i sea menor igual al total de páginas
      cp++; //cada vez que se ejecute el while se va a sumar una página
      this.pages.push(cp); //lo agregamos al array que se mostrara en el front
      i += parseInt(totalpaginas); //por cadda vez que se cumpla la condición al i se le va a sumar el (total de paginas a mostrar)
    }
    //this.pagination = this.pages;
    console.log("total de paginas: ", this.pages);
    console.log("this.currentPage: ", this.currentPage);

    return {
      infoResultados: this.infoResultados,
      pages: this.pages,
      //pages: this.pagination,
      currentPage: this.currentPage,
      previousPage: this.previousPage,
      nextPage: this.nextPage,
    }


  }*/


  //metodo si el token expira, limpiamos el localStorage y redireccionamos al login
  errorData(data:any) {
    console.log("errorData: ", data);
    console.log("data.error.msg: ", data.error.msg);
    if(data.error.msg == "Token no valido"){
      this.msg('error', 'Error', data.error.msg);
      setTimeout(() => {
         this.router.navigateByUrl('/auth');
         this.authService.logout();
      }, 2000);
    } else {
      this.msg('error', 'Error', "Error interno del servidor");
    }


  }



}
