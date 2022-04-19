import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


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
            this.msg('error', 'Error', `El campo ${field} es requerido.`);

          }
    
          if(control?.errors?.['minlength']){ 
            //console.log('error', `El campo ${field} debe de tener al menos 3 caracteres.`);
            this.msg('error', 'Error', `El campo ${field} debe de tener al menos 3 caracteres.`);
            
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

  generarPaginacion(data:any){

    console.log("****data*****");
    console.log(data);
    
    this.dataAlmacen = data.data;
    //`Mostrando del 1 a 50 (Total: 71 resultados)`

    /**
     * Armar paginación -- LuisMh 16-04-22
     * 
     */
     
    this.previousPage = data.previousPage;
    this.currentPage = data.currentPage;
    this.nextPage = data.nextPage;

    this.totalregistros = data.total;
    let totalpaginas = data.limit;


    let inicio  = 0;
    let fin = 0;
    //var cantidad_registros = page_limit;
    //var currentPage = parseInt(current_page);

    inicio = (this.currentPage * totalpaginas) - totalpaginas;

    (inicio == 0) ? inicio = 1 : inicio = inicio; 

    fin = (this.nextPage == null) ? fin = this.totalregistros : fin = (this.currentPage * totalpaginas);

    /*if(this.currentPage > 1){
        inicio = (cantidad_registros * (this.currentPage - 1));
        inicio = (cantidad_registros * current_page) - page_limit;
        cantidad_registros = cantidad_registros * current_page;
    }*/

    //limit ${inicio}, ${page_limit};

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

    //validar el número total de paginas
    /*console.log("numero total de paginación: ", this.pages.length);
    if(this.pages.length > 5){ //si la paginación es mayor a 5 hacemos la validación
      let numeroPenultimoPaginacion = this.pages.length - 1;
      this.pagination = [];
      for(let j = 1; j<=this.pages.length; j++){
        console.log("j: ", j);
        if(j < 6){ 
          this.pagination.push(j);
        } else {
          if(j == numeroPenultimoPaginacion){
            this.pagination.push("...");
          } else if(j == this.pages.length){
            this.pagination.push(j);
          }
        }
        
      }
    }*/
    
    //console.log("this.pagination: ", this.pagination);

    return {
      infoResultados: this.infoResultados,
      pages: this.pages,
      //pages: this.pagination,
      currentPage: this.currentPage,
      previousPage: this.previousPage,
      nextPage: this.nextPage,
    }


    /**
     * End paginación
     * 
     */


  }


  //metodo si el token expira, limpiamos el localStorage y redireccionamos al login
  errorData(data:any) {
    if(data.msg == "Token no valido"){
      this.msg('error', 'Error', data.msg);
      setTimeout(() => {
         this.router.navigateByUrl('/auth');
         this.authService.logout();
      }, 2000);
    } else {
      this.msg('error', 'Error', "Error interno del servidor");
    }


  }



}
