import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../../services/almacen.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import * as moment from 'moment';

import { SharedService } from 'src/app/frontend/shared/shared.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styles: [
  ]
})
export class AlmacenComponent implements OnInit {

  titulo:string = "Catálogo Almacén";
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


  /*End Paginación */


  /*formularioAlmacen: FormGroup = new FormGroup({
    'clave' : new FormControl(""),
    'nombre' : new FormControl(""),
    'estatus' : new FormControl(true)
  }); */



  formularioAlmacen: FormGroup = this.fb.group({
    'clave': ['', [Validators.required, Validators.minLength(3), this.sharedService.removeSpaces] ],
    'nombre': ['', [Validators.required, Validators.minLength(3), this.sharedService.removeSpaces]],
    'estatus': [true],
  });

  formularioBuscar: FormGroup = this.fb.group({
    'clave_s': ['', [this.sharedService.removeSpaces ] ],
    'nombre_s': ['', [this.sharedService.removeSpaces]],
    'estatus_s': [99],
    'page_limit':[10],
    'order':[this.order],
    'current_page':[this.current_page],
    'fecha_inicio':[""],
    'fecha_fin':[""]
  });

  constructor( 
    private almacenService: AlmacenService, 
    private fb: FormBuilder,
    private sharedService: SharedService,
    ) {}

  ngOnInit(): void {

    this.getData();


  }

  exportarCsv(param?:string, data?: any){

    const headers =  ["Id", "Clave", "Nombre", "Estatus", "Fecha"];

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
          estatus: (value.estatus == 1) ? "Activo" : "Inactivo",
          created_at: moment(value.created_at).format("YYYY-MM-DD HH:mm:ss")
        };
      });

    this.sharedService.exportCsv(dataExport, this.titulo, headers);
  }

  exportarTodoCsv(){
    this.almacenService.getDataAll().subscribe(data => {
      console.log("getDataAll");
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
    console.log("this.formularioBuscar.value.current_page; ", this.formularioBuscar.value.current_page);

    this.formularioBuscar.value.page_limit = this.page_limit;
    this.formularioBuscar.value.order = this.order;
    (this.formularioBuscar.value.fecha_inicio == "" || this.formularioBuscar.value.fecha_inicio == null || this.formularioBuscar.value.fecha_inicio == "Invalid date") ? this.formularioBuscar.value.fecha_inicio = "" : this.formularioBuscar.value.fecha_inicio = moment(this.formularioBuscar.value.fecha_inicio).format("YYYY-MM-DD");
    (this.formularioBuscar.value.fecha_fin == "" || this.formularioBuscar.value.fecha_fin == null || this.formularioBuscar.value.fecha_fin == "Invalid date") ? this.formularioBuscar.value.fecha_fin = "" : this.formularioBuscar.value.fecha_fin = moment(this.formularioBuscar.value.fecha_fin).format("YYYY-MM-DD");
    (this.formularioBuscar.value.estatus_s == 99) ? this.formularioBuscar.value.estatus_s = "" : this.formularioBuscar.value.estatus_s = this.formularioBuscar.value.estatus_s;

    this.almacenService.getData(paramas).subscribe(resp => {
      console.log("get data almacen");
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

  //Agregar Almacen
  agregar(){
    console.log("Agregar nuevo almacen");
    this.tituloModal = "Agregar Almacen";
    this.display = true;
    this.formularioAlmacen.reset({
     estatus: true      
    });
    this.botonModal = "Agregar";
  }


  editar(id:string){
    console.log("Editar nuevo almacen");
    console.log(id);
    sessionStorage.setItem("idAlmacen", id);
    this.almacenService.editar(id).subscribe(data=>{
      console.log("data almacen");
      console.log(data);
      if(data.error == false){
        this.formularioAlmacen.reset({
          id: data.data[0].id,
          clave: data.data[0].clave,
          nombre: data.data[0].nombre,
          estatus: (data.data[0].estatus == 1) ? true : false,
        });
      } else {
        this.sharedService.errorData(data);
      }
    });

    this.tituloModal = "Editar Almacen";
    this.display = true;
    /*this.formularioAlmacen.reset({
     estatus: true      
    });*/
    this.botonModal = "Actualizar";
  }

  closeModal(){
    console.log("salir");
    this.display = false;
  }

  //Agregar o actualizar datos
  confirmar(tipo:string){
    console.log("Agregar/Actualizar almacen");
    console.log(this.formularioAlmacen.controls);
    
    const validate = this.sharedService.validarCampos(this.formularioAlmacen);

    if(validate.invalid){
      return;
    }

    //console.log(this.formularioAlmacen.value.estatus);

    (this.formularioAlmacen.value.estatus == true) ? this.formularioAlmacen.value.estatus = 1 : this.formularioAlmacen.value.estatus = 0;

    console.log(this.formularioAlmacen.value);

    if(tipo == "Agregar"){
      this.add(this.formularioAlmacen.value);
    } else {
      this.update(this.formularioAlmacen.value);
    }


  }

 

  add(almacen:any){
    console.log("Agregamos el nuevo almacen");
    console.log(almacen);
    this.almacenService.agregar(almacen)
    .subscribe(data => {
        console.log('Respuesta', data);
        this.display = false;
        if(data.error === false){
          this.sharedService.msg('success', 'Éxito', data.msg);
          this.getData(this.formularioBuscar.value);
        } else {
          console.log(data.msg);
          this.sharedService.errorData(data);
        }
    });
          

  }

  update(almacen:object){
    console.log("Actualizamos el almacen");
    const id = sessionStorage.getItem("idAlmacen") || '';
    this.almacenService.actualizar(id, almacen).subscribe(data => {
      console.log('Respuesta', data);
        this.display = false;
        if(data.error === false){
          this.sharedService.msg('success', 'Éxito', data.msg);
          this.getData(this.formularioBuscar.value);
        } else {
          console.log(data.msg);
          this.sharedService.errorData(data);
        }
    });
  }


  eliminar(obj:any){
    console.log("Eliminar almacen");
    console.log(obj);
    sessionStorage.setItem("idAlmacen", obj.id);

    Swal.fire({
      title: `¿Está seguro de eliminar el almacén ${obj.clave}?`,
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.almacenService.eliminar(obj.id).subscribe(data => {
            console.log('Respuesta', data);
            if(data.error === false){
              this.sharedService.msg('success', 'Éxito', data.msg);
              this.getData(this.formularioBuscar.value);
            } else {
              console.log(data.msg);
              this.sharedService.errorData(data);
              
              /**/
              
            }
        });
        
      }
    });

  }


}//end clase