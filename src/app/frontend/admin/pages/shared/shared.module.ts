import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '../../admin-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
