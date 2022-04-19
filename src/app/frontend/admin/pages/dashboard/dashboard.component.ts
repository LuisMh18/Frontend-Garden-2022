import { Component, OnInit/*, ViewChild*/ } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  //@ViewChild('asTittleSection') public tituloSeccion!: ElementRef;
  //@ViewChild('asTittleSection') asTittleSection: any;

  //@ViewChild('asTittleSection', {static: false}) tituloSeccion!: ElementRef;

  seccion: string = "Dashboard";

  constructor() { }

  ngOnInit(): void {
    
  }


  /*ngAfterViewInit() {
    console.log("loquesea");
    console.log(document.getElementById("seccion")?.innerHTML);
    let element = document.getElementById("seccion") | null;
    element.innerHTML="hola";
  }*/

}
