import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
import { Geolocation, Geoposition} from '@ionic-native/geolocation';
import { Location } from '../../providers/location/location';
import {RestauranteProvider} from '../../providers/restaurante/restaurante';

declare var google;

@IonicPage()
@Component({
  selector: 'page-localizacion',
  templateUrl: 'localizacion.html',
})
export class LocalizacionPage {

	title: string = 'Arrastre el marcador  hasta la posicion de su resataurante'
  lat: number;
  lng: number;
  categoria;
  location:Location;
  locationIsSet = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public platform: Platform,public geolocation: Geolocation, public rest:RestauranteProvider) {
    this.lat = -19.0491027;
    this.lng = -65.2580259;
    this.categoria = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizacionPage'+ this.categoria.$key);
  }
  mapa(){
    console.log(this.lat+'/'+this.lng)
    this.rest.crearMapa(this.categoria.$key, this.lat, this.lng);

  }
  dragEnd($event) {
    this.lat= $event.coords.lat;
    this.lng = $event.coords.lng;
    //this.form.patchValue({ latitude: $event.coords.lat, longitude: $event.coords.lng });
  }



}
