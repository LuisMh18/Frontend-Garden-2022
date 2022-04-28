import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    TiendaComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule
  ]
})
export class ClientModule { }
