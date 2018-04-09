import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { Perfil} from '../../providers/perfil/perfil';
/**
 * Generated class for the RestaurantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {
	public perfil;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public alertCtrl: AlertController) {
  	this.perfil =  navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage'+ this.perfil.$key);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Proximamente',
      subTitle: 'App en desarrollo....',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
