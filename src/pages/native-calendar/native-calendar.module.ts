import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NativeCalendarPage } from './native-calendar';

@NgModule({
  declarations: [
    NativeCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(NativeCalendarPage),
  ],
})
export class NativeCalendarPageModule {}
