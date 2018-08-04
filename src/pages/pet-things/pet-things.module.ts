import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetThingsPage } from './pet-things';

@NgModule({
  declarations: [
    PetThingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PetThingsPage),
  ],
})
export class PetThingsPageModule {}
