import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ComercializadorComponent } from './pages/comercializador/comercializador.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AgentesComponent } from './pages/agentes/agentes.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

const routes: Routes = [

  {
    path:'',
    component: LayoutComponent,
    children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'almacen', component: AlmacenComponent},
      {path:'clientes', component: ClientesComponent},
      {path:'comercializador', component: ComercializadorComponent},
      {path:'inventario', component: InventarioComponent},
      {path:'agentes', component:AgentesComponent},
      {path:'**', component: DashboardComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
