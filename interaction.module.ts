import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InteractionPage } from './interaction';

@NgModule({
  declarations: [
    InteractionPage,
  ],
  imports: [
    IonicPageModule.forChild(InteractionPage),
  ],
})
export class InteractionPageModule {}
