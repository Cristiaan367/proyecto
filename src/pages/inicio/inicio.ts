import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  //private userAuth: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  onViewDidLoad() {
    /*// we will use anonymous auth turn it on on firebase
    firebase.auth().signInAnonymously().then(auth => {
        // when authenticated... alert the user
        console.log('login success');
        this.userAuth = auth;
      })
      .catch((error: Error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
      });*/
  }

  

}
