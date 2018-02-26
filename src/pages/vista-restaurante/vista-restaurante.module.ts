import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaRestaurantePage } from './vista-restaurante';

@NgModule({
  declarations: [
    VistaRestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(VistaRestaurantePage),
  ],
})
export class VistaRestaurantePageModule {}
