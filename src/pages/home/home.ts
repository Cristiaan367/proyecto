import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, ToastController, LoadingController   } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {UsuarioProvider} from '../../providers/usuario/usuario';
//import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public  loadingCtrl: LoadingController,
  	public alertCtrl : AlertController,public toatCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public usuario:UsuarioProvider) {
  }

  cerrar(){
    var loader = this.loadingCtrl.create({
      content: "Espere Un momento..."
    });
    loader.present();
    this.usuario.logout().then(() => {
        //show toast before redirecting
        loader.dismiss();
        this.navCtrl.setRoot(LoginPage);
    });
  }

}
