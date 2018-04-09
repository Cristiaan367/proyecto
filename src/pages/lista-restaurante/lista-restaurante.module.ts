import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaRestaurantePage } from './lista-restaurante';

@NgModule({
  declarations: [
    ListaRestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRestaurantePage),
  ],
})
export class ListaRestaurantePageModule {}
