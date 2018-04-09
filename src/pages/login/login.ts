import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegistrarsePage } from '../registrarse/registrarse';
import { UsuarioProvider } from '../../providers/usuario/usuario';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsuarioProvider]
})
export class LoginPage {
	public email:string;
	public contrasena: string; 

  constructor(public usuario : UsuarioProvider,
  	public loadingCtrl: LoadingController,
  	public toastCtrl: ToastController,
  	public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  enviarLogin(){
  	var that = this;
  	var loader = this.loadingCtrl.create({
  		content: "Espere Un momento..."
  	});
  	loader.present();
  		
  	this.usuario.loginUserService(this.email,this.contrasena).then(authData => {
  		//exitoso
  		loader.dismiss();
  		that.navCtrl.setRoot(HomePage);
  	},error => {
  		loader.dismiss();
  		//no Inicia sesion
  		let toast = this.toastCtrl.create({
  			message: error,
  			duration: 3000,
  			position: 'top'
  		});
  		toast.present();
  		that.contrasena = "" //borra la contraseña en el espacio de la contraseña 
  	});
  }

  olvidaContrasena(){

  }

  redirigeRegistro(){
  	this.navCtrl.push(RegistrarsePage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Proximamente',
      subTitle: 'App en desarrollo.........',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
