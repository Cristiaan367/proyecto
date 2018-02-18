import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
	public data: any;
	public fireAuth:any;
	public userProfile:any;

  constructor(public http: Http) {
  	this.fireAuth = firebase.auth();
  	this.userProfile = firebase.database().ref('users');

  }
  loginUserService(email: string, password: string):any{
  	return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  loginUsuario(account: {}){
  	return this.fireAuth.createUserWithEmailAndPassword(account['email'],account['contrasena']).then((newUser)=>{
  		this.fireAuth.signInWithEmailAndPassword(account['email'], account['contrasena']).then((authenticatedUser)=>{
  			this.userProfile.child(authenticatedUser.uid).set(
  				account
  			);
  		});
  	});
  }

  logout(){
    return this.fireAuth.signOut();
  }

}
