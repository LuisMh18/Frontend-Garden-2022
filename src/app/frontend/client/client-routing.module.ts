import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [

  {
    path:'',
    component: LayoutComponent,
    children: [
      {path:'productos', component: TiendaComponent},
      {path:'**', component: TiendaComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
