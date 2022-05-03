import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentesRoutingModule } from './agentes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    PedidosComponent,
  ],
  imports: [
    CommonModule,
    AgentesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AgentesModule { }
