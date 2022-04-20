import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { SharedService } from 'src/app/frontend/shared/shared.service';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styles: [
  ]
})
export class InventarioComponent implements OnInit {

  titulo:string = "Inventario";
  resultData: any[] = [];
  display: boolean = false;
  tituloModal! : string;
  checked: boolean = true;
  botonModal!:string;
  page_limit = "10";
  order = "DESC";


  /**Paginación*/
  current_page:number = 1;
  totalregistros:number = 0;
  infoResultados!:string;
  paginacion!:any;
  pagina: number = 1;


  formularioBuscar: FormGroup = this.fb.group({
    'clave_s': ['', [this.sharedService.removeSpaces ] ],
    'nombre_s': ['', [this.sharedService.removeSpaces]],
    'pedimento': ['', [this.sharedService.removeSpaces]],
    'page_limit':[10],
    'order':[this.order],
    'current_page':[this.current_page],
    'fecha_inicio':[""],
    'fecha_fin':[""]
  });

  constructor( 
    private inventarioService: InventarioService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    ) {}

  ngOnInit(): void {

    this.getData();


  }

  

  exportarCsv(param?:string, data?:any){

    const headers = ["Id", "Clave", "Producto", "Pedimento", "Cantidad", "Fecha"];

    let dataEx = this.resultData;

    if(param){
      dataEx = data;
    }

    const dataExport = dataEx
    .map((value) => {
      return {
        id: value.id,
        clave: value.clave,
        nombre: value.nombre,
        pedimento: value.num_pedimento,
        cantidad: value.cantidad,
        created_at: moment(value.created_at).format("YYYY-MM-DD HH:mm:ss")
      };
    });

    this.sharedService.exportCsv(dataExport, this.titulo, headers);
  }

  exportarTodoCsv(){
    this.inventarioService.getDataAll().subscribe(data => {
      console.log("-getDataAll-");
      console.log(data);
      if(data.error === false){
        this.exportarCsv("todo", data.data);
      } else {  
        this.sharedService.errorData(data);
      }
    });
  }

  pageChangeEvent(event: number){
    this.pagina = event;
    console.log("this.p: ", this.pagina);
    this.formularioBuscar.value.current_page = this.pagina;
    this.getData(this.formularioBuscar.value);
 }

  clear(){
    this.formularioBuscar.reset({ estatus_s: 99 });
    this.page_limit = "10";
    this.order = "DESC";
    this.pagina = 1;
    this.getData();
  }

  getData(paramas?:any) {

    this.formularioBuscar.value.page_limit = this.page_limit;
    this.formularioBuscar.value.order = this.order;
    (this.formularioBuscar.value.fecha_inicio == "" || this.formularioBuscar.value.fecha_inicio == null || this.formularioBuscar.value.fecha_inicio == "Invalid date") ? this.formularioBuscar.value.fecha_inicio = "" : this.formularioBuscar.value.fecha_inicio = moment(this.formularioBuscar.value.fecha_inicio).format("YYYY-MM-DD");
    (this.formularioBuscar.value.fecha_fin == "" || this.formularioBuscar.value.fecha_fin == null || this.formularioBuscar.value.fecha_fin == "Invalid date") ? this.formularioBuscar.value.fecha_fin = "" : this.formularioBuscar.value.fecha_fin = moment(this.formularioBuscar.value.fecha_fin).format("YYYY-MM-DD");
    (this.formularioBuscar.value.estatus_s == 99) ? this.formularioBuscar.value.estatus_s = "" : this.formularioBuscar.value.estatus_s = this.formularioBuscar.value.estatus_s;

    this.inventarioService.getData(paramas).subscribe(resp => {
      console.log("get data inventario");
      console.log(resp);
      if(resp.error === false){
        if(!resp.data.data.length){
          this.sharedService.msg('info', 'Info', 'No se encontraron resultados!');
        }
        this.resultData = resp.data.data;

        /**
         * Armar paginación -- LuisMh 16-04-22
         * 
         */
         this.paginacion = this.sharedService.mostrarResultados(resp.data);
         this.infoResultados = this.paginacion.infoResultados;
         /*this.pages = this.paginacion.pages;
         this.currentPage = this.paginacion.currentPage;
         this.previousPage = this.paginacion.previousPage;
         this.nextPage = this.paginacion.nextPage;*/
         this.totalregistros = resp.data.total;

        /**
         * End paginación
         * 
         */

      } else {
        console.log(resp.msg);
        this.sharedService.errorData(resp);
      }
    });

  }

  mostrar(){

    console.log("this.page_limit: ", this.page_limit);
    console.log("this.totalregistros: ", this.totalregistros);
    //console.log("this.pages.length: ", this.pages.length)
    console.log("this.resultData.length: ", this.resultData)
    
    /*Si el total de registros por pagina es mayor a el total de registros obtenidos 
    mostramos desde la página 1 */
    if(parseInt(this.page_limit) > this.totalregistros){
      this.formularioBuscar.value.current_page = 1;
    }

    this.getData(this.formularioBuscar.value);
  }

  ordenar(){
    this.getData(this.formularioBuscar.value);
  }

  buscar(){
    this.getData(this.formularioBuscar.value);

  }



}//end clase