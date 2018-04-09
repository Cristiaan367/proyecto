import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, ToastController, LoadingController, Loading  } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { Observable } from 'rxjs/Observable';
import {UsuarioProvider} from '../../providers/usuario/usuario';
//import {PhotoProvider} from '../../providers/foto/foto';
import { Categoria} from '../../providers/categoria/categoria';
import { CategoriaService} from '../../providers/categoria/categorias.service';
import { ListaRestaurantePage } from '../lista-restaurante/lista-restaurante'

//import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: []
})
export class HomePage {
   //userPostsLists = [];
  //userProfileLists: any;
  //userId: any;
   //public photoList = [];
   showLoader: boolean = true;
  loading: Loading
  listaRestaurante = ListaRestaurantePage;
  Categoria$: Observable<Categoria[]>;


  constructor( public  loadingCtrl: LoadingController,
  	public alertCtrl : AlertController,public toastCtrl: ToastController, public navCtrl: NavController,
     public navParams: NavParams, public usuario: UsuarioProvider, public categoriaService: CategoriaService) {
    //this.listUsersNearby();

      // this.userProfileLists = firebase.database().ref('users');
       
       //get list of posts on page init
       this.entrar();
  }
  ionViewDidLoad() {
    this.Categoria$ = this.categoriaService.findAll({orderByChild: 'nombre'});
  }

  entrar() {

    if (!this.showLoader) return;

    this.loading = this.loadingCtrl.create({
      content: 'Buscando categorias...',
      duration: 2500
    });

    this.loading.present();
    this.showLoader = false;

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
  viewRestaurante(data){
    this.navCtrl.push(ListaRestaurantePage, {
      data: data

    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Proximamente',
      subTitle: 'App en desarrollo.........',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  /*listUsersNearby(){
    
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

  }*/

   ionViewDidLoadl() {
  }

  /*anterior(){
     var that = this;
    
      let toast = this.toastCtrl.create({
      message: 'Cargando Ciudades...',
    });
    
    toast.present();//inicia el toast
    this.photoProvider.listSomethingOnceService('/ciudad').then((snapshot)=>{

    that.userPostsLists.length = null; //so that it ddoesn't repeat the list
    snapshot.forEach(function (childSnapshot) {
                      var data = childSnapshot.val();
                        //data['key'] = childSnapshot.key;
                        //data['profilePic'] = '/assets/img/marty-avatar.png';
                        console.log(data);
                         that.userPostsLists.push(data);
                });
            
    toast.dismiss();
        
                


    })

    /*this.photoProvider.getCiudades().on('value', snapshot => {
      //this.photoList = [];
      //this.photoList.length = null;
      snapshot.forEach( snap => {
        //this.photoList.length = null;
        this.photoList.push({
          id: snap.key,
          name: snap.val().name,
          picture: snap.val().picture,
        });
        console.log(this.photoList);
        //toast.dismiss();
        return false
      });
      toast.dismiss();//cierra el toast
    }, error =>{
        let toast = this.toastCtrl.create({
      message: 'Lo siento, no pude recuperar la lista, verifique su conexión a Internet',
      duration: 3000
    });
    toast.present();
      });               
}*/

}
