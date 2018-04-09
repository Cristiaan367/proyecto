import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importacion de la libreria para la camara 
import { Camera } from	'@ionic-native/camera';
//importacion de modelo
//import { PhotoProvider } from	'../../providers/foto/foto';
import { RestauranteProvider } from '../../providers/restaurante/restaurante';
//importar una pagina para redireccionar a esa pagina despues de guardar las fotos 
import {HomePage} from '../home/home';


/**
 * Generated class for the AgregarRestaurantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-restaurante',
  templateUrl: 'agregar-restaurante.html',
})
export class AgregarRestaurantePage {
		public nombre;
    public descripcion;
    public direccion;
    public contacto;
    public horario;
    public web;
    public ciudad;
    public picture;
		public base64Image;
    public userPostsLists = [];

  constructor(public cameraPlugin: Camera, public restauranteProvider: RestauranteProvider,
  	public navCtrl: NavController, public navParams: NavParams) {
    this.cargarCategoria();
  		
  }

  ionViewDidLoad() {
    
  }

  crearRestaurante(){
    var restaurante = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      direccion: this.direccion,
      contacto: this.contacto,
      horario: this.horario,
      web: this.web,
      ciudad: this.ciudad,
      picture: this.picture
    };
  	this.restauranteProvider.createPost(restaurante);
  	this.navCtrl.setRoot(HomePage);
  }
   //Utiliza la camara para tomar una foto
  takePicture(){
    this.cameraPlugin.getPicture({
      quality : 70,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
       // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.Picture is passing the string to our DB
      this.picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
    //utiliza la galeria del telefono para seleccionar una fotoç
  galletyOptions(){
    this.cameraPlugin.getPicture({
      quality: 70,
      allowEdit:  true,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      targetWidth:720,
      targetHeight: 360,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.base64Image =  "data:image/jpeg;base64," + imageData;
      this.picture = imageData;
    }, error =>{
        console.log("ERROR ->" + JSON.stringify(error));
    });
  }

   cargarCategoria(){
    var that = this;
    this.restauranteProvider.listSomethingOnceService('/categoria').then((snapshot)=>{

    that.userPostsLists.length = null; //so that it ddoesn't repeat the list
    snapshot.forEach(function (childSnapshot) {
                      var data = childSnapshot.val();
                        data['key'] = childSnapshot.key;
                        //data['profilePic'] = '/assets/img/marty-avatar.png';
                        console.log(data);
                         that.userPostsLists.push(data);
                });
    });
  }

}
