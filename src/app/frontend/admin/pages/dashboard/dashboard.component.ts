import { Component, OnInit/*, ViewChild*/ } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //@ViewChild('asTittleSection') public tituloSeccion!: ElementRef;
  //@ViewChild('asTittleSection') asTittleSection: any;

  //@ViewChild('asTittleSection', {static: false}) tituloSeccion!: ElementRef;

  titulo: string = "Dashboard";
  anio_mes_dia!: string;
  anio_mes!: string;
  anio!: string;
  fecha = new Date();
  f_inicio = true;
  f_mes_anio = false;
  f_anio = false;
  f_fin = false;
  label_fecha = true;

  totalPedidos!: number;
  totalPedidosCancelados!: number;
  totalPedidosCredito!: number;
  totalPedidosDineroCancelados!: number;
  totalPedidosDineroCredito!: number;
  totalPedidosDineroPagados!: number;
  totalPedidosDineroPendientes!: number;
  totalPedidosDineroPorDia!: number;
  totalPedidosPagados!: number;
  totalPedidosPendientes!: number;

  productosTotales!:any;
  productosTotalesDetalle!:any;

  //grafica
  data: any;
  chartOptions: any;

  //modal --
  display: boolean = false;
  tituloModal! : string;
  nombreProductoModal!:string;
  dataDetalleInventario: any = [];

  formularioBuscar : FormGroup = this.fb.group({
    'tipo': ['dia'],
    'fecha_inicio': [this.fecha],
    'fecha_fin': [this.fecha],
    'mes_anio': [this.fecha],
    '_anio': [this.fecha],
  });

  constructor(private dashboardService: DashboardService, 
              private sharedService: SharedService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
  }


  getData(){

    
    this.dashboardService.getData(this.formularioBuscar.value).subscribe(data => {
      console.log("data");
      console.log(data);
      if(data.error == false){
        //console.log(data.data.totalPedidos);
        if(this.formularioBuscar.value.tipo == "todos"){
          this.totalPedidos = (data.total.totalPedidos == null || data.total.totalPedidos == "") ? 0 : data.total.totalPedidos;
          this.totalPedidosCancelados = (data.total.totalPedidosCancelados == null || data.total.totalPedidosCancelados == "") ? 0 : data.total.totalPedidosCancelados;
          this.totalPedidosCredito = (data.total.totalPedidosCredito == null || data.total.totalPedidosCredito == "") ? 0 : data.total.totalPedidosCredito;
          this.totalPedidosDineroCancelados = (data.total.totalPedidosDineroCancelados == null || data.total.totalPedidosDineroCancelados == "") ? 0 : data.total.totalPedidosDineroCancelados;
          this.totalPedidosDineroCredito = (data.total.totalPedidosDineroCredito == null || data.total.totalPedidosDineroCredito == "") ? 0 : data.total.totalPedidosDineroCredito;
          this.totalPedidosDineroPagados = (data.total.totalPedidosDineroPagados == null || data.total.totalPedidosDineroPagados == "") ? 0 : data.total.totalPedidosDineroPagados; 
          this.totalPedidosDineroPendientes = (data.total.totalPedidosDineroPendientes == null || data.total.totalPedidosDineroPendientes == "") ? 0 : data.total.totalPedidosDineroPendientes; 
          this.totalPedidosDineroPorDia = (data.total.totalPedidosDinero == null || data.total.totalPedidosDinero == "") ? 0 : data.total.totalPedidosDinero;
          this.totalPedidosPagados = (data.total.totalPedidosPagados == null || data.total.totalPedidosPagados == "") ? 0 : data.total.totalPedidosPagados;
          this.totalPedidosPendientes = (data.total.totalPedidosPendientes == null || data.total.totalPedidosPendientes == "") ? 0 : data.total.totalPedidosPendientes;
        } else {
          this.totalPedidos = (data.data.totalPedidos == null || data.data.totalPedidos == "") ? 0 : data.data.totalPedidos;
          this.totalPedidosCancelados = (data.data.totalPedidosCancelados == null || data.data.totalPedidosCancelados == "") ? 0 : data.data.totalPedidosCancelados;
          this.totalPedidosCredito = (data.data.totalPedidosCredito == null || data.data.totalPedidosCredito == "") ? 0 : data.data.totalPedidosCredito;
          this.totalPedidosDineroCancelados = (data.data.totalPedidosDineroCancelados == null || data.data.totalPedidosDineroCancelados == "") ? 0 : data.data.totalPedidosDineroCancelados;
          this.totalPedidosDineroCredito = (data.data.totalPedidosDineroCredito == null || data.data.totalPedidosDineroCredito == "") ? 0 : data.data.totalPedidosDineroCredito;
          this.totalPedidosDineroPagados = (data.data.totalPedidosDineroPagados == null || data.data.totalPedidosDineroPagados == "") ? 0 : data.data.totalPedidosDineroPagados; 
          this.totalPedidosDineroPendientes = (data.data.totalPedidosDineroPendientes == null || data.data.totalPedidosDineroPendientes == "") ? 0 : data.data.totalPedidosDineroPendientes; 
          this.totalPedidosDineroPorDia = (data.data.totalPedidosDineroPorDia == null || data.data.totalPedidosDineroPorDia == "") ? 0 : data.data.totalPedidosDineroPorDia;
          this.totalPedidosPagados = (data.data.totalPedidosPagados == null || data.data.totalPedidosPagados == "") ? 0 : data.data.totalPedidosPagados;
          this.totalPedidosPendientes = (data.data.totalPedidosPendientes == null || data.data.totalPedidosPendientes == "") ? 0 : data.data.totalPedidosPendientes;
        }

        this.productosTotales = data.productoTotales;
        this.productosTotalesDetalle = _.orderBy(data.productoTotales, ['id', 'clave'], ['desc', 'asc']);

        //Armar grafica
        this.data = {
          labels: ['Todos', 'Pagados', 'Crédito', 'Pendientes', 'Cancelados'],
          datasets: [
              {
                  data: [this.totalPedidos, this.totalPedidosPagados, this.totalPedidosCredito, this.totalPedidosPendientes, this.totalPedidosCancelados],
                  backgroundColor: [
                      "#FF6384",
                      "#1caf9a",
                      "#337ab7",
                      "#FE9A2E",
                      "#a93018"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#1caf9a",
                      "#337ab7",
                      "#FE9A2E",
                      "#a93018"
                  ]
              }
          ]
      };
        

      } else {
        this.sharedService.errorData(data);
      }
    });
  }

  //cambiar
  changeTipo(){
    //console.log("tipo: ", this.formularioBuscar.value.tipo);
    this.label_fecha = true;
    switch (this.formularioBuscar.value.tipo) {
      case 'anio':
        this.f_inicio = false;
        this.f_mes_anio = false;
        this.f_anio = true;
        this.f_fin = false;
        break;
      case 'mes':
        this.f_inicio = false;
        this.f_mes_anio = true;
        this.f_anio = false;
        this.f_fin = false;
        break;
      case 'dia':
        this.f_inicio = true;
        this.f_mes_anio = false;
        this.f_anio = false;
        this.f_fin = false;
        break;
      case 'periodo':
          this.f_inicio = true;
          this.f_mes_anio = false;
          this.f_anio = false;
          this.f_fin = true;
          break;
      default:
        this.f_inicio = false;
        this.f_mes_anio = false;
        this.f_anio = false;
        this.f_fin = false;
        this.label_fecha = false;
    }
    

    this.getData();
  }


  changeDate(){
    this.getData();
  }


  detalleInventario(id_producto:number){
    console.log("id_producto: ", id_producto);
    this.dashboardService.getInventario(id_producto).subscribe(data => {
        console.log(data);
        if(data.error === false){
          this.display = true;
          this.tituloModal = data.data[0].clave;
          this.nombreProductoModal = data.data[0].nombre;
          this.dataDetalleInventario = data.data;
        } else {
          this.sharedService.errorData(data);
        }
    });
  }


  /*ngAfterViewInit() {
    console.log("loquesea");
    console.log(document.getElementById("seccion")?.innerHTML);
    let element = document.getElementById("seccion") | null;
    element.innerHTML="hola";
  }*/

}
