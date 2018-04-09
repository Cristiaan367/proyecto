import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaAgregarPage } from './categoria-agregar';

@NgModule({
  declarations: [
    CategoriaAgregarPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaAgregarPage),
  ],
})
export class CategoriaAgregarPageModule {}
