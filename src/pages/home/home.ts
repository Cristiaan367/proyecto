import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, ToastController, LoadingController   } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {UsuarioProvider} from '../../providers/usuario/usuario';
import {PostsService} from '../../providers/post-service/post.service';
import {PhotoProvider} from '../../providers/foto/foto';

//import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PostsService]
})
export class HomePage {
   userPostsLists = [];
  userProfileLists: any;
  userId: any;
   public photoList = [];


  constructor( public  loadingCtrl: LoadingController,public postService: PostsService,
  	public alertCtrl : AlertController,public toastCtrl: ToastController, public navCtrl: NavController,
     public navParams: NavParams, public usuario:UsuarioProvider
     ,public photoProvider: PhotoProvider) {
    //this.listUsersNearby();

      // this.userProfileLists = firebase.database().ref('users');
       
       //get list of posts on page init

       

  }

  cerrar(){
    var loader = this.loadingCtrl.create({
      content: "Espere Un momento..."
    });
    loader.present();
    this.usuario.logout().then(() => {
        //show toast before redirecting
        loader.dismiss();
        this.navCtrl.setRoot(LoginPage);
    });
  }

  listUsersNearby(){
    
    var that = this;
    
      let toast = this.toastCtrl.create({
      message: 'Fetching users nearby...',
    });
    
    toast.present();
    
    this.postService.listSomethingOnceService('/users').then((snapshot)=>{

that.userPostsLists.length = null; //so that it ddoesn't repeat the list
    snapshot.forEach(function (childSnapshot) {
                      var data = childSnapshot.val();
                        data['key'] = childSnapshot.key;
                        data['profilePic'] = '/assets/img/marty-avatar.png';
                         that.userPostsLists.push(data);
                });
            
    toast.dismiss();
        
                

    }, error =>{
        let toast = this.toastCtrl.create({
      message: 'Sorry couldnt retrive list, check your internet connection',
      duration: 3000
    });
    toast.present();
      });

  }

   ionViewDidLoad() {
  }

  ionViewDidEnter(){
     //var that = this;
    
      let toast = this.toastCtrl.create({
      message: 'Cargando Ciudades...',
    });
    
    toast.present();

    this.photoProvider.getCiudades().on('value', snapshot => {
      this.photoList = [];
      snapshot.forEach( snap => {
        this.photoList.push({
          id: snap.key,
          name: snap.val().name,
          picture: snap.val().picture,
        });
        console.log(this.photoList);
        toast.dismiss();
        return false
      });
    }, error =>{
        let toast = this.toastCtrl.create({
      message: 'Lo siento, no pude recuperar la lista, verifique su conexión a Internet',
      duration: 3000
    });
    toast.present();
      });               
}

}
