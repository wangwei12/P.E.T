import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewaddPage } from './newadd';

@NgModule({
  declarations: [
    NewaddPage,
  ],
  imports: [
    IonicPageModule.forChild(NewaddPage),
  ],
})
export class NewaddPageModule {}
