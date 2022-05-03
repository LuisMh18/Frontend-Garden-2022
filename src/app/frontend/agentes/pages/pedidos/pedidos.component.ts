import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  titulo = "Lista de pedidos";

  page_limit = "10";
  order = "DESC";

  resultData: any[] = [];

  /**Paginación*/
  current_page:number = 1;

  infoResultados!:string;
  paginacion!:any;

  totalregistros:number = 0;
  pagina: number = 1;

  sumaTotal:number = 0;


  formularioBuscar: FormGroup = this.fb.group({
    'npedido_s': [''],
    'cliente_s': ['', [this.sharedService.removeSpaces]],
    'estatus_s': [99],
    'page_limit':[10],
    'order':[this.order],
    'current_page':[this.current_page],
    'fecha_inicio':[""],
    'fecha_fin':[""]
  });

  constructor(private pedidosService: PedidosService,
              private sharedService: SharedService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    this.getData();
  }

  buscar(){
    this.getData(this.formularioBuscar.value);
  }

  clear(){
    this.formularioBuscar.reset({ estatus_s: 99 });
    this.page_limit = "10";
    this.order = "DESC";
    this.pagina = 1;
    this.getData();
  }


  exportarCsv(param?:string, data?: any){

    const headers =  ["N° Pedido", "N° Cliente", "Fecha de registro", "Cliente", "Total pedido", "Extras", "Estatus"];

    let dataEx = this.resultData;

    if(param){
      dataEx = data;
    } 


    const dataExport = dataEx
      .map((value) => {
        return {
          num_pedido: value.num_pedido,
          numero_cliente: value.numero_cliente,
          created_at: moment(value.created_at).format("YYYY-MM-DD HH:mm:ss"),
          nombre_cliente: value.nombre_cliente,
          total: value.total,
          extra_pedido: value.extra_pedido,
          estatusDes: value.estatusDes,
        };
      });

    this.sharedService.exportCsv(dataExport, this.titulo, headers);

  }

  exportarTodoCsv(){
    this.pedidosService.getDataAll().subscribe(data => {
      console.log(data);
      if(data.error === false){
        this.exportarCsv("todo", data.data);
      } else {
        this.sharedService.errorData(data);
      }
    });
  }


  getData(params?:any){

    console.log("this.formularioBuscar.value");
    console.log(this.formularioBuscar.value);
    this.formularioBuscar.value.page_limit = this.page_limit;
    this.formularioBuscar.value.order = this.order;
    (this.formularioBuscar.value.fecha_inicio == "" || this.formularioBuscar.value.fecha_inicio == null || this.formularioBuscar.value.fecha_inicio == "Invalid date") ? this.formularioBuscar.value.fecha_inicio = "" : this.formularioBuscar.value.fecha_inicio = moment(this.formularioBuscar.value.fecha_inicio).format("YYYY-MM-DD");
    (this.formularioBuscar.value.fecha_fin == "" || this.formularioBuscar.value.fecha_fin == null || this.formularioBuscar.value.fecha_fin == "Invalid date") ? this.formularioBuscar.value.fecha_fin = "" : this.formularioBuscar.value.fecha_fin = moment(this.formularioBuscar.value.fecha_fin).format("YYYY-MM-DD");
    (this.formularioBuscar.value.estatus_s == 99) ? this.formularioBuscar.value.estatus_s = "" : this.formularioBuscar.value.estatus_s = this.formularioBuscar.value.estatus_s;

    this.pedidosService.getData(params).subscribe(data => {
      console.log(data);
      if(data.error === false){

        if(!data.data.data.length){
          this.sharedService.msg('info', 'Info', 'No se encontraron resultados!');
        }
        this.resultData = data.data.data;

        this.paginacion = this.sharedService.mostrarResultados(data.data);
        this.infoResultados = this.paginacion.infoResultados;
        this.totalregistros = data.data.total;
        this.sumaTotal = data.totalSumaPedidos;


      } else {
        this.sharedService.errorData(data);
      }
    });
  }

pageChangeEvent(event: number){

    this.pagina = event;
    this.formularioBuscar.value.current_page = this.pagina;
    this.getData(this.formularioBuscar.value);

}

mostrar(){
  console.log(this.page_limit);
  this.getData(this.formularioBuscar.value);
}

ordenar(){
  this.getData(this.formularioBuscar.value);
}


}//end class
