import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { SharedService } from '../../../shared/shared.service';

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

  constructor(private tiendaService: TiendaService, private sharedService: SharedService) { }

  ngOnInit(): void {

    this.getData();

    /*this.categorias = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];*/

  }


  getData(){
    this.tiendaService.getProducts().subscribe(data => {
      console.log(data);
      if(data.error === false){
        this.products = data.data;
        console.log(data.categorias);
        let options = [];
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




}
