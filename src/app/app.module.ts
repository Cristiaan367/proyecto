import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
//importar paginas 
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistrarsePage} from '../pages/registrarse/registrarse';
import {InicioPage} from '../pages/inicio/inicio';
import { AgregarRestaurantePage } from '../pages/agregar-restaurante/agregar-restaurante';
import { VistaRestaurantePage} from '../pages/vista-restaurante/vista-restaurante';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//modelo , hacen peticiones a la base de datos
import {UsuarioProvider} from '../providers/usuario/usuario';
import {PictureUtils} from '../service/pictureUtils.service';
import { Camera } from '@ionic-native/camera';
import { PhotoProvider } from '../providers/foto/foto';
import { RestauranteProvider} from '../providers/restaurante/restaurante'; 
//importacion de la sdk de firebase
import * as firebase from 'firebase';


//Añadiendo firebase a la aplicacion
export const config = {
    apiKey: "AIzaSyDr9Mo8WFIBY95ymPA8ISr8OMM9cCySxIs",
    authDomain: "proyectopruebasc.firebaseapp.com",
    databaseURL: "https://proyectopruebasc.firebaseio.com",
    projectId: "proyectopruebasc",
    storageBucket: "proyectopruebasc.appspot.com",
    messagingSenderId: "87183104723"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistrarsePage,
    InicioPage,
    AgregarRestaurantePage,
    VistaRestaurantePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegistrarsePage,
    InicioPage,
    AgregarRestaurantePage,
    VistaRestaurantePage

  ],
  providers: [
    PictureUtils,
    Camera,
    PhotoProvider,
    RestauranteProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider
  ]
})
export class AppModule {}
