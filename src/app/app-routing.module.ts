import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  { //Área de administración
    path: 'admin',
    loadChildren: () => import('./frontend/admin/admin.module').then( m => m.AdminModule),
    //canActivate: [ ValidarTokenGuard ],
    //canLoad: [ ValidarTokenGuard ]
  },
  { //Área del agente, para mostrar los pedidos que tiene asignados
    path: 'agentes',
    loadChildren: () => import('./frontend/agentes/agentes.module').then( m => m.AgentesModule),
    //canActivate: [ ValidarTokenGuard ],
    //canLoad: [ ValidarTokenGuard ]
  },
  { //Área del cliente, dónde compra los productos
    path: 'cliente',
    loadChildren: () => import('./frontend/client/client.module').then( m => m.ClientModule),
    //canActivate: [ ValidarTokenGuard ],
    //canLoad: [ ValidarTokenGuard ]
  },
  { 
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
