import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AngularCalendarPage } from './angular-calendar';

@NgModule({
  declarations: [
    AngularCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(AngularCalendarPage),
  ],
})
export class AngularCalendarPageModule {}
