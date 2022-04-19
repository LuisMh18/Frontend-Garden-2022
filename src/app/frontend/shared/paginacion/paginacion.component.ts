import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: []
})
export class PaginacionComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

  }


}
