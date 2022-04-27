import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ToastModule } from 'primeng/toast';

import { CalendarModule } from 'primeng/calendar';

import { ImageModule } from 'primeng/image';

import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { MatTabsModule } from '@angular/material/tabs';

import { TabViewModule } from 'primeng/tabview';

import { ChartModule } from 'primeng/chart';

@NgModule({
  exports: [
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    ToastModule,
    CalendarModule,
    ImageModule,
    NgxPaginationModule,
    HttpClientModule,
    MatTabsModule,
    TabViewModule,
    ChartModule
  ]
})

export class MaterialModule { }
