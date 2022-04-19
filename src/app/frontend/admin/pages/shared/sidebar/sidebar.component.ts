import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';
import { AuthResponse } from '../../../../../auth/interfaces/interfaces';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MenuService } from '../../../services/menu.service';
import { MenuResponse } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menu = false;
  public usuario!: AuthResponse;
  public datamenu: any[] = [];

  public opcion!: number;

  public objetoPrueba = [ 
    { "id": 18, "nombre": "Consultas", "ruta": "/admin/consultas", "orden": 18, "menu_id": 2, "created_at": "2022-04-14T03:30:42.000Z", "updated_at": "2022-04-14T03:30:42.000Z" }, 
    { "id": 19, "nombre": "Movimientos", "ruta": "/admin/movimientos", "orden": 19, "menu_id": 2, "created_at": "2022-04-14T03:30:42.000Z", "updated_at": "2022-04-14T03:30:42.000Z" }, 
    { "id": 20, "nombre": "Estatus", "ruta": "/admin/estatus", "orden": 20, "menu_id": 2, "created_at": "2022-04-14T03:30:42.000Z", "updated_at": "2022-04-14T03:30:42.000Z" } 
  ];

  //public totalopcionesMenu = 20;

  constructor(private router: Router, 
             private authService: AuthService, 
             private breakpointObserver: BreakpointObserver,
             private menuService: MenuService
             ) {

    // detect screen size changes
    this.breakpointObserver.observe([
      "(min-width: 1280px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          // hide stuff    
          console.log("se cumple la condición de resolucion de pantalla: ", result.matches);
          this.menu = true;   
      } else {
          // show stuff
          this.menu = false;   
          console.log("la resolución esta abajo de los 1280px");   
      }
    })

    /*window.addEventListener("resize", function(){
        alert("La resolución de tu pantalla es: " + screen.width + " x " + screen.height);
        if(screen.width >= 1280){
          this.menu = true;
        }
    });*/
   }

  ngOnInit(): void {

    //this.usuario = JSON.parse(localStorage.getItem("usuario"));
    //console.log("usuario::: ", usuario);

    this.usuario = JSON.parse(localStorage.getItem("usuario")!);

    console.log("usuario::: ", this.usuario );
    console.log("--------");
    console.log(this.usuario.usuario.nombreRol);
    console.log(this.usuario.usuario);
    console.log(this.usuario.error!);
    console.log("--------");
    //console.log(this.usuario.email);

    
    this.armarMenu();

    this.objetoPrueba.forEach( value => {
      console.log("objetoPrueba value");
      console.log(value.nombre);
    } );

  }

  armarMenu(){
    this.menuService.getMenu().subscribe(resp => {
      console.log("--resp---");
      console.log(resp.error);
      console.log(resp.data);
      if(resp.error === false){
        this.datamenu = resp.data;
      } else {
        console.log("**error***");
        console.log(resp.msg);
        this.router.navigateByUrl('/auth');
        this.authService.logout();
      }

    });

/*
    this.menuService.getMenu().subscribe(
      response => {
        console.log(response);
        
      }, error => {
        if (error.statusText == 'Unauthorized') {
          //this._commonService.token_expired();
        } else {
          console.log('Error 500');
          console.log(<any>error);
          //this._commonService.msj('error', 'Erro interno del servidor');
  
        }
      }
    );*/


  }


  ocultarMostrarMneu(){
    console.log("se oculta o se muestra");
    console.log(this.menu);

    
    this.breakpointObserver.observe([
      "(min-width: 1280px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {  
      } else {
        //this.opcion = 0;
        if(this.menu == false){
          this.menu = true;
        } else {
          this.menu = false;
        } 
      }
    })

    

  }

  

  ocultarMostrarSubMenu(numero: number){
    console.log("se oculta o se muestra");
    let opcionAntes = this.opcion;
    console.log("opcion antes: ", opcionAntes);
    this.opcion = numero;
    let opcionDespues = this.opcion;
    console.log("numero: ", numero);
    console.log("opcion: ", opcionDespues);

    if(opcionAntes === numero && numero === opcionDespues){
      this.opcion = 0;
    }

    /*switch (numero) {
      case 1:
        this.opcionMenu1 = !valor;
        break;
      case 2:
        this.opcionMenu2 = !valor;
        break;
      default:
        console.log('No se encuentra la opción solicitada.');
    }*/

  }

  logout(){

    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }

}
