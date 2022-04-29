import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';

//import { SharedService } from '../../../shared/shared.service';

import { SharedService } from 'src/app/frontend/shared/shared.service';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  products!: any;
  sortOrder!: number;
  sortField!: string;
  categorias!: any;

  @ViewChild('claveBuscar') claveBuscar!:ElementRef<HTMLInputElement>;
  @ViewChild('categoriaBuscar') categoriaBuscar!:Dropdown;

  constructor(private tiendaService: TiendaService, private sharedService: SharedService) { }

  ngOnInit(): void {

    this.getData();

    /*this.categorias = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];*/

  }


  getData(params?:any){
    this.tiendaService.getProducts(params).subscribe(data => {
      console.log(data);
      if(data.error === false){
        this.products = data.data;

        if(!this.products.length){
          this.sharedService.msg('info', 'Info', 'No se encontraron resultados!');
        }

        console.log(data.categorias);
        let options = [];
        options.push({
          label:"Todas",
          value: ""
        });
        for(let category of data.categorias){
          options.push({
            label:category.categoria,
            value: category.id
          });
        }
        this.categorias = options;
        //this.categorias = data.categorias;
      } else {
        this.sharedService.errorData(data);
      }
    });
  }



  buscar(){
    const clave = this.claveBuscar.nativeElement.value.toUpperCase().trim();
    console.log("clave: ", clave);

    const categoria = this.categoriaBuscar.value;
    console.log("categoria: ", categoria);

    /*if(clave == ""){
      this.sharedService.msg('error', 'Error', "Agregue la clave del producto");
      return;
    }*/

    this.claveBuscar.nativeElement.value = '';
    //this.categoriaBuscar.value = '';

    const params = 
      {
        clave: clave,
        categoria: categoria
      };

    this.getData(params);

  }


}
