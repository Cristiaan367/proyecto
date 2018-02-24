import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importacion de la libreria para la camara 
import { Camera } from	'@ionic-native/camera';
import { PhotoProvider } from	'../../providers/foto/foto';
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
		public Picture;
		public base64Image;

  constructor(public cameraPlugin: Camera, public photoProvider: PhotoProvider,
  	public navCtrl: NavController, public navParams: NavParams) {
  		
  }

  ionViewDidLoad() {
    
  }

  crearRestaurante(photoName: string, picture: string){
  	this.photoProvider.createPost(photoName, this.Picture);
  	this.navCtrl.setRoot(HomePage);
  }

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
      this.Picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

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
      this.Picture = imageData;
    }, error =>{
        console.log("ERROR ->" + JSON.stringify(error));
    });
  }

}
