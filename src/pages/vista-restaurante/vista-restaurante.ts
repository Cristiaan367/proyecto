import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//importar pagina donde se redirige editar restaurante
import { AgregarRestaurantePage } from '../agregar-restaurante/agregar-restaurante';
/**
 * Generated class for the VistaRestaurantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista-restaurante',
  templateUrl: 'vista-restaurante.html',
})
export class VistaRestaurantePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaRestaurantePage');
  }

  paginaCrear(){
  	this.navCtrl.push(AgregarRestaurantePage);
  }

}
