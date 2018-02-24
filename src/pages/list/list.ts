import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import * as firebase from  'firebase';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public miUserid : any;
  public UsuarioNombreCompleto: any;
  public UsuarioTelefono: any;
  public UsuarioCiudad: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public usuarioProvider: UsuarioProvider) {
      this.miUserid = firebase.auth().currentUser.uid; //El id  del ususario actual

      this.verUsuario(this.miUserid);
  }

  verUsuario(usuarioId){
    var that = this;
    this.usuarioProvider.viewUser(usuarioId).then( snapshot =>{
      if(snapshot.val()){
        that.UsuarioNombreCompleto = snapshot.val().nombre +' '+ snapshot.val().apellido;
        that.UsuarioTelefono = snapshot.val().telefono;
        that.UsuarioCiudad = snapshot.val().ciudad;
        console.log("este es el nombre del usuario"+ that.UsuarioNombreCompleto);
      }
    })
  }

  
}
