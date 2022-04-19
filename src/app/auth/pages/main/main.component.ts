import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //titulo: string = "Hola Mundo";

  constructor(/*private router: Router*/) { 
    

   

  }

  

  ngOnInit(): void {

    /*console.log('Ruta activa: ', this.router.url);
    if(this.router.url == "/auth/login"){
      this.titulo = "Iniciar Sesión";
    } else {
      this.titulo = "Loquesea";
    }*/

  }



}
