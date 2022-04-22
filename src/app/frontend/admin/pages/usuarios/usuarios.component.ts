import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';

import Swal from 'sweetalert2'

import * as moment from 'moment';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  titulo: string = "Catálogo Usuarios";

  resultData: any[] = [];
  roles: any[] = [];
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

  updatePass = false;
  addPass = false;


  formularioUsuario: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.minLength(3), this.sharedService.removeSpaces] ],
    'email': ['', [Validators.required, Validators.minLength(3), Validators.email , this.sharedService.removeSpaces]],
    'rol_id': [3],
    'password': ['', [Validators.required, Validators.minLength(6), this.sharedService.removeSpaces]],
    'password_confirm': ['', [Validators.required, Validators.minLength(6), this.sharedService.removeSpaces]],
    'old_password': ['', [Validators.required, Validators.minLength(6), this.sharedService.removeSpaces]],
    'new_password': ['', [Validators.required, Validators.minLength(6), this.sharedService.removeSpaces]],
    'new_password_confirm': ['', [Validators.required, Validators.minLength(6), this.sharedService.removeSpaces]],
  });

  formularioBuscar: FormGroup = this.fb.group({
    'usuario_s': ['', [this.sharedService.removeSpaces ] ],
    'rol_id_s': [99],
    'page_limit':[10],
    'order':[this.order],
    'current_page':[this.current_page],
    'fecha_inicio':[""],
    'fecha_fin':[""]
  });

  constructor( 
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    ) {}

  ngOnInit(): void {

    this.getData();


  }

  exportarCsv(param?:string, data?: any){

    const headers =  ["Id", "Usuario", "Email", "Rol", "Fecha"];

    let dataEx = this.resultData;

    if(param){
      dataEx = data;
    } 

    const dataExport = dataEx
      .map((value) => {
        let rol = "";
        if(value.rol_id == 1){
          rol = "Cliente";
        } else if(value.rol_id == 2){
          rol = "Agente";
        } else if(value.rol_id == 3){
          rol = "Administrador";
        }
        return {
          id: value.id,
          usuario: value.usuario,
          email: value.email,
          rol: rol,
          created_at: moment(value.created_at).format("YYYY-MM-DD HH:mm:ss")
        };
      });

    this.sharedService.exportCsv(dataExport, this.titulo, headers);
  }

  exportarTodoCsv(){
    this.usuariosService.getDataAll().subscribe(data => {
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
    this.formularioBuscar.reset({ rol_id_s: 99 });
    this.page_limit = "10";
    this.order = "DESC";
    this.pagina = 1;
    this.getData();
  }


  getData(params?:any) {

    this.formularioBuscar.value.page_limit = this.page_limit;
    this.formularioBuscar.value.order = this.order;
    (this.formularioBuscar.value.fecha_inicio == "" || this.formularioBuscar.value.fecha_inicio == null || this.formularioBuscar.value.fecha_inicio == "Invalid date") ? this.formularioBuscar.value.fecha_inicio = "" : this.formularioBuscar.value.fecha_inicio = moment(this.formularioBuscar.value.fecha_inicio).format("YYYY-MM-DD");
    (this.formularioBuscar.value.fecha_fin == "" || this.formularioBuscar.value.fecha_fin == null || this.formularioBuscar.value.fecha_fin == "Invalid date") ? this.formularioBuscar.value.fecha_fin = "" : this.formularioBuscar.value.fecha_fin = moment(this.formularioBuscar.value.fecha_fin).format("YYYY-MM-DD");
    (this.formularioBuscar.value.rol_id_s == 99) ? this.formularioBuscar.value.rol_id_s = "" : this.formularioBuscar.value.rol_id_s = this.formularioBuscar.value.rol_id_s;

    this.usuariosService.getData(params).subscribe(data => {
      console.log(data);
      if(data.error === false){
        if(!data.data.data.length){
          this.sharedService.msg('info', 'Info', 'No se encontraron resultados!');
        }
        this.paginacion = this.sharedService.mostrarResultados(data.data);
        this.resultData = data.data.data;
        this.infoResultados = this.paginacion.infoResultados;
        this.totalregistros = data.data.total;
        //console.log("params:::::: ", params);
        if(params == undefined){
          this.roles = data.roles;
        }
        /*setTimeout(() => {
          (this.formularioBuscar.value.rol_id_s == "") ?  this.formularioBuscar.reset({ rol_id_s: 99}) : this.formularioBuscar.reset({ rol_id_s: this.formularioBuscar.value.rol_id_s });
        }, 5);*/
        
      } else {
        console.log(data.msg);
        this.sharedService.errorData(data);
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
    this.tituloModal = "Agregar Usuario";
    this.addPass = true;
    this.updatePass = false;
    this.display = true;
    this.botonModal = "Agregar";

    this.formularioUsuario.reset({
      rol_id: 3 ,
      password: '',
      password_confirm: '', 
      old_password: '12345678', 
      new_password: '12345678', 
      new_password_confirm: '12345678', 
    });

  }


  editar(id:string){
    console.log("Editar nuevo almacen");
    console.log(id);
    sessionStorage.setItem("idUsuario", id);

    this.addPass = false;
    this.updatePass = true;

    this.usuariosService.editar(parseInt(id)).subscribe(data => {
      console.log("data: ", data);
      if(data.error === false){
        this.formularioUsuario.reset({
          usuario: data.data[0].usuario,
          email: data.data[0].email,
          rol_id: data.data[0].rol_id,
          password: '12345678',
          password_confirm: '12345678', 
          old_password: '', 
          new_password: '', 
          new_password_confirm: '', 

        });
      } else {
        this.sharedService.errorData(data);
      }
    });

    this.tituloModal = "Editar Usuario";
    this.display = true;
    this.botonModal = "Actualizar";
  }

  closeModal(){
    console.log("salir");
    this.display = false;
  }

  //Agregar o actualizar datos
  confirmar(tipo:string){
    console.log(this.formularioUsuario.controls);

    if(tipo == "Agregar"){
      this.formularioUsuario.value.old_password = "12345678";
      this.formularioUsuario.value.new_password = "12345678";
      this.formularioUsuario.value.new_password_confirm = "12345678"; 
    } else {
      this.formularioUsuario.value.password = "12345678";
      this.formularioUsuario.value.password_confirm = "12345678";
    }

    console.log("this.formularioUsuario");
    console.log(this.formularioUsuario.value);
    
    const validate = this.sharedService.validarCampos(this.formularioUsuario);

    if(validate.invalid){
      return;
    }
    if(tipo == "Agregar"){
      this.add(this.formularioUsuario.value);
    } else {
      this.update(this.formularioUsuario.value);
    }

  }
 

  add(usuario:any){
    console.log(usuario);
    this.usuariosService.agregar(usuario).subscribe(data => {
      console.log(data);
      if(data.error === false){
        this.display = false;
        this.sharedService.msg('success', 'Éxito', data.msg);
        this.getData(this.formularioBuscar.value);
      } else {
        this.sharedService.errorData(data);
      }
    });
  }

  update(almacen:object){
    console.log("Actualizamos el almacen");
    const id =  parseInt(sessionStorage.getItem("idUsuario") || '');
    this.usuariosService.actualizar(id, almacen).subscribe(data => {
        if(data.error === false){
          this.display = false;
          this.sharedService.msg('success', 'Éxito', data.msg);
          this.getData(this.formularioBuscar.value);
        } else {
          this.sharedService.errorData(data);
        }
    });
  }


  eliminar(obj:any){
    console.log("Eliminar usuario");
    console.log(obj);

    Swal.fire({
      title: `¿Está seguro de eliminar el usuario ${obj.usuario}?`,
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminar(obj.id).subscribe(data => {
          if(data.error === false){
            this.sharedService.msg("success", "Éxito", data.msg);
            this.getData(this.formularioBuscar.value);
          } else {
            this.sharedService.errorData(data);
          }
        });
      }
    });

  }

}
