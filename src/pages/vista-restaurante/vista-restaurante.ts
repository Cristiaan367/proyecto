import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import { PerfilService } from '../../providers/perfil/perfil.service';
import { Perfil } from '../../providers/perfil/perfil';
//importar pagina donde se redirige editar restaurante
import { AgregarRestaurantePage } from '../agregar-restaurante/agregar-restaurante';
import { LocalizacionPage } from '../localizacion/localizacion';
//import { RestauranteProvider} from '../../providers/restaurante/restaurante';
/**
 * Generated class for the VistaRestaurantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista-restaurante',
  templateUrl: 'vista-restaurante.html',
})
export class VistaRestaurantePage {
  //public nombre;
  //public picture;
  //public descripcion;
  perfil$: Observable<Perfil[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public perfilService: PerfilService) {
    //this.perfil$ = this.perfilService.buscarPorUsuario();
    //console.log('aver'+ this.perfil$);
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad VistaRestaurantePage');
    this.perfil$ = this.perfilService.buscarPorUsuario();
    console.log('aver'+ this.perfil$);
  }

  paginaCrear(){
  	this.navCtrl.push(AgregarRestaurantePage);
  }

  abrirMapa(data){
    this.navCtrl.push(LocalizacionPage,{
      data:data
    });

  }
/*
  perfilRest(){
    var that =  this;
      //that.restaurantesIds.push(data);
      //console.log("aver ");
        that.restauranteProvider.viewResta().then(snapshot => {
  
             //get user photo
             if(snapshot.val()){
               var datos = snapshot.val();
               //datos = snapshot.val().key;
               //that.restaurantes.push(data);
               that.picture = snapshot.val().picture;
               that.nombre = snapshot.val().nombre;
               that.descripcion = snapshot.val().descripcion;
               console.log("datos:"+datos);
             }
          })
    
    var that= this; console.log('ver ono1')
    this.restauranteProvider.vistaResta().then((snapshot)=>{
      console.log('ver ono2')
    //that.perfil.length = null; //so that it ddoesn't repeat the list
    snapshot.forEach(function (childSnapshot) {
                  var data = childSnapshot.val();
                        that.nombre = childSnapshot.val().nombre;
                        that.descripcion = childSnapshot.val().descripcion;
                        that.picture = childSnapshot.val().picture;
                         //data['key'] = childSnapshot.key;
                        //data['profilePic'] = '/assets/img/marty-avatar.png';
                        console.log(data);
                         //that.perfil.push(data);
                });
    })
  }*/

}
