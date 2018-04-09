import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera'
import { CategoriaService } from '../../providers/categoria/categorias.service';
import { HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-agregar-categoria',
  templateUrl: 'agregar-categoria.html',
})
export class AgregarCategoriaPage {
	Picture;
	base64Image;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public categoriaService: CategoriaService, public cameraPlugin: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarCategoriaPage');
  }
  createPost(photoName: string, Picture: string, descripcion:string){
    this.categoriaService.createPost(photoName, this.Picture, descripcion);
    this.navCtrl.setRoot(HomePage);
  }

  takePicture(){
    this.cameraPlugin.getPicture({
      quality : 70,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
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
