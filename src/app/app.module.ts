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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//proveedro de servicios
import {UsuarioProvider} from '../providers/usuario/usuario';
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
    InicioPage
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
    InicioPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider
  ]
})
export class AppModule {}
