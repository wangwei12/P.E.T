import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchpetPage } from './searchpet';

@NgModule({
  declarations: [
    SearchpetPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchpetPage),
  ],
})
export class SearchpetPageModule {}
