import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
//import { Categoria } from '../../providers/categoria/categoria';
import { Perfil } from '../../providers/perfil/perfil';
import { PerfilService } from '../../providers/perfil/perfil.service';
import { RestaurantePage } from '../restaurante/restaurante'

@IonicPage()
@Component({
  selector: 'page-lista-restaurante',
  templateUrl: 'lista-restaurante.html',
})
export class ListaRestaurantePage {
	//restaurantePage = RestaurantePage;
  //mapPlacesPage = MapPlacesPage;
  public categoria;
  perfil$: Observable<Perfil[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public perfilService:PerfilService) {
    this.categoria = navParams.get('data');
  }

  ionViewDidLoad() {
    //this.categoria = this.navParams.data;
    //console.log(this.categoria.$key);
    
    console.log(this.categoria);
    this.perfil$ = this.perfilService.findByArea(this.categoria.$key);
  }

  verRestaurante(data){
    this.navCtrl.push(RestaurantePage, {
      data: data

    });
  }
  

  

}
