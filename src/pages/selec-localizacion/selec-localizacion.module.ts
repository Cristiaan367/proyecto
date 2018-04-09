import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecLocalizacionPage } from './selec-localizacion';

@NgModule({
  declarations: [
    SelecLocalizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecLocalizacionPage),
  ],
})
export class SelecLocalizacionPageModule {}
