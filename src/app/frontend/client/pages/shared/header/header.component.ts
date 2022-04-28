import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Garden Central";

  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }

  logout(){

    localStorage.clear();
    this.router.navigateByUrl('/auth');

  }


}
