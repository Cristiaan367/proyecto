import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage} from '../home/home';

/**
 * Generated class for the RegistrarsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {
	public email: string;
	public telefono: any;
	public contrasena: any;
	public nombre: any;
	public apellido: any;
	public ciudad: any;
	public rest: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public usuarioProvider: UsuarioProvider, public toastCtrl: ToastController,
  	public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarsePage');
  }
  registro(){
  	 var account = {
  	 	nombre: this.nombre,
  	 	apellido: this.apellido || '',
  	 	email: this.email,
  	 	telefono: this.telefono || '',
  	 	contrasena: this.contrasena,
  	 	ciudad: this.ciudad,
  	 	rest: this.rest || '' 
  	 };
  	 var that = this;
  	 var loader = this.loadingCtrl.create({
  	 	content: "Espere un momento...",
  	 });
  	 loader.present();

  	 this.usuarioProvider.loginUsuario(account).then(authData =>{
  	 	loader.dismiss();
  	 	that.navCtrl.setRoot(HomePage);
  	 }, error =>{
  	 	loader.dismiss();
  	 	let toast = this.toastCtrl.create({
  	 		message: error,
  	 		duration:3000,
  	 		position:'top'
  	 	});
  	 	toast.present();
  	 	that.contrasena =""
  	 });
  }

}
