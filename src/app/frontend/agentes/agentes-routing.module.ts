import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { LayoutComponent } from '../client/pages/layout/layout.component';



const routes: Routes = [

  {
    path:'',
    component: LayoutComponent,
    children: [
      {path:'pedidos', component: PedidosComponent},
      {path:'**', component: PedidosComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentesRoutingModule { }
