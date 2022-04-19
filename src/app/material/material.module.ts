import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ToastModule } from 'primeng/toast';

import { CalendarModule } from 'primeng/calendar';

import { ImageModule } from 'primeng/image';

@NgModule({
  exports: [
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    ToastModule,
    CalendarModule,
    ImageModule
  ]
})
export class MaterialModule { }
