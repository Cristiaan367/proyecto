import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//paginas 
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { InicioPage} from '../pages/inicio/inicio';
import { AgregarRestaurantePage } from '../pages/agregar-restaurante/agregar-restaurante';
import {VistaRestaurantePage} from '../pages/vista-restaurante/vista-restaurante'
import { AgregarCategoriaPage } from '../pages/agregar-categoria/agregar-categoria'
import { LocalizacionPage} from '../pages/localizacion/localizacion';

import {UsuarioProvider} from '../providers/usuario/usuario';
//firebase
//import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, ico: any}>;

  //public userId;
  //public usuarioActual;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
      ,private afAuth: AngularFireAuth, public loadingCtrl:LoadingController, public usuario:UsuarioProvider) {
    this.initializeApp();
    //this.usuarioActual = firebase.auth().currentUser.uid;
    this.afAuth.authState.subscribe(auth => {
      if(! auth){
        this.rootPage = LoginPage;
      }else{
        //let user = this.afAuth.auth.currentUser;
        this.rootPage = HomePage;
        //if(user. === null){
        //  this.rootPage = 'HomePage';
        //}else{
        //  this.rootPage = 'HomePage';
        //}        
      }        
    });
    /*
    var that = this;

    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        //Usuario ah iniciado sesion muestra El home(inicio)
        that.rootPage = HomePage;
      }
      else{
        //Usuario ah cerrado sesion muestra la pagina de inicio de secion
        that.rootPage = LoginPage;
      }
    });
    */

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Demo Mapa', component: InicioPage, ico: 'map'},
      { title: 'Nuevo Restaurant', component:AgregarRestaurantePage, ico: 'add'},
      { title: 'Mi Restaurante', component: VistaRestaurantePage, ico: 'restaurant'},
      { title: 'Demo Categoria', component: AgregarCategoriaPage, ico: 'add'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#E32727');
                //statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  openRoot(){
    this.nav.setRoot(HomePage);
  }

  cerrar(){
    var loader = this.loadingCtrl.create({
      content: "Espere Un momento..."
    });
    loader.present();
    this.usuario.logout().then(() => {
        //show toast before redirecting this.fireAuth.signOut();
        loader.dismiss();
        this.nav.setRoot(LoginPage);
    });
  }




}
