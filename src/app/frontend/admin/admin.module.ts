import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComercializadorComponent } from './pages/comercializador/comercializador.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AgentesComponent } from './pages/agentes/agentes.component';

import { SharedModule } from './pages/shared/shared.module';

//material
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { MessageService } from 'primeng/api';
import { FrontendModule } from '../frontend.module';
import { InventarioComponent } from './pages/inventario/inventario.component';
//import { PaginacionComponent } from '../shared/paginacion/paginacion.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AlmacenComponent,
    ClientesComponent,
    ComercializadorComponent,
    LayoutComponent,
    AgentesComponent,
    InventarioComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FrontendModule
  ],
  providers: [
    //MessageService,
    //PaginacionComponent
  ],
})
export class AdminModule { }
